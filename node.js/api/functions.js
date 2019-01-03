/*
login in security/authentication.js
*/

sessions_manager = require("../security/sessionsManager");
tweets_repo = require("../repos/tweets");
courses_repo = require("../repos/courses");
registers_repo = require("../repos/registers");
auth = require("../security/authentication");

/*
request query
session_id
*/
exports.get_newest_tweets = function(req, res){
    console.log("Get newest tweets");
    console.log(req.params.session_id);
    if(sessions_manager.is_session_id_valid(req.params.session_id)){
        tweets_repo.get_newest(req, res);
    } else {
        res.send("Invalid session");
    }
}

/*
request params
session_id
*/
exports.get_channels = function(req, res){
    console.log(req.params.session_id);
    if(sessions_manager.is_session_id_valid(req.params.session_id)){
        var userid = sessions_manager.get_user_id_from_session(req.params.session_id);
        console.log(userid);
        if(userid!=false){
            courses_repo.get_all_courses_with_registers(userid, function(result){
                if(result!=false){
                    res.send(JSON.stringify(result));
                } else {
                    res.send("error - no channels found");
                }
            });
        } else {
            res.send("error - not identified");
        }
    } else {
        res.send("Invalid session");
    }
}

exports.get_registerd_channels = function(req, res){
    console.log(req.params.session_id);
    if(sessions_manager.is_session_id_valid(req.params.session_id)){
        var userid = sessions_manager.get_user_id_from_session(req.params.session_id);
        console.log("userid: "+userid);
        if(userid!=false){
            courses_repo.get_courses_of_user(userid, function(result){
                if(result!=false){
                    res.send(JSON.stringify(result));
                } else {
                    res.send("error - no channels found");
                }
            });
        } else {
            res.send("error - not identified");
        }
    } else {
        res.send("Invalid session");
    }
}

/*
request params
session_id
course_id
*/
exports.register_to_channel = function(req, res){
    console.log("follow");
    if(sessions_manager.is_session_id_valid(req.params.session_id)){
        var userid = sessions_manager.get_user_id_from_session(req.params.session_id);
        if(userid!=false){
            registers_repo.add_register(userid, req.params.course_id, function(result){
                if(result == true){
                    res.send("success");
                    console.log("success");
                } else {
                    res.send("error");
                }
            })
        } else {
            res.send("error");
        }
    } else {
        res.send("Invalid session");
    }
}

/*
request params
session_id
course_id
*/
exports.unregister_from_channel = function(req, res){
    console.log("unfollow");
    if(sessions_manager.is_session_id_valid(req.params.session_id)){
        var userid = sessions_manager.get_user_id_from_session(req.params.session_id);
        if(userid!=false){
            registers_repo.delete_register(userid, req.params.course_id, function(result){
                if(result == true){
                    console.log("success");
                    res.send("success");
                } else {
                    res.send("error");
                }
            })
        } else {
            res.send("error");
        }
    } else {
        res.send("Invalid session");
    }
}
//web socket clients
clients=[];
/*
request params
session_id
tweet
>userid
>courseid
>content
>timestamp
*/

//TODO

exports.send_tweet = function(req, res){
    console.log("sending tweet")
    if(sessions_manager.is_session_id_valid(req.params.session_id)){
        var userid = sessions_manager.get_user_id_from_session(req.params.session_id);
        if(userid!=false){
            var tweet = req.body;
            console.log("request body")
            console.log(tweet);
            tweet.user = userid;
            tweet.timestamp = new Date();
            console.log(tweet);
            tweets_repo.add_new(tweet, function(result){
                if(result == true){
                    //change user id to username
                    tweet.user_id = sessions_manager.get_username_from_session(req.params.session_id);
                    courses_repo.get_course_by_id(tweet.course, function(result){
                        if(result != false){
                            tweet.course_id = result.name;
                            //experiment
                            for(var i=0; i<clients.length; i++){
                                if(clients[i].readyState == 1){
                                    clients[i].send(JSON.stringify(tweet));
                                }
                            }
                            //dummy broadcast
                            res.send("success");
                        } else {
                            console.log("Next nasty error")
                            res.send("error");
                        }
                    });
                    
                } else {
                    res.send("error");
                }
            });
        } else {
            res.send("error");
        }
    } else {
        res.send("Invalid session");
    }
}

exports.login1 = function(req, res){
    auth.login1(req, res);
}

exports.login2 = function(req, res){
    auth.login2(req, res);
}

exports.logout = function(req, res){
    auth.logout(req, res);
}

exports.connection_handler = function(ws, req){
    clients.push(ws);
}