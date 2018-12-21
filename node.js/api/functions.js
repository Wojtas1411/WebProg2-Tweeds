/*
login in security/authentication.js
*/

sessions_manager = require("../security/sessionsManager");
tweets_repo = require("../repos/tweets");
courses_repo = require("../repos/courses")
registers_repo = require("../repos/registers");

/*
request params
session_id
*/
exports.get_newest_tweets = function(req, res){
    if(sessions_manager.is_session_id_valid(req.params.session_id)){
        tweets_repo.get_newest_tweets(req, res);
    } else {
        res.send("Invalid session");
    }
}

/*
request params
session_id
*/
exports.get_channels = function(req, res){
    if(sessions_manager.is_session_id_valid(req.params.session_id)){
        var userid = sessions_manager.get_user_id_from_session(req.params.session_id);
        if(userid!=false){
            courses_repo.get_all_courses_with_registers(userid, function(result){
                if(result!=false){
                    res.send(JSON.stringify(result));
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

/*
request params
session_id
course_id
*/
exports.register_to_channel = function(req, res){
    if(sessions_manager.is_session_id_valid(req.params.session_id)){
        var userid = sessions_manager.get_user_id_from_session(req.params.session_id);
        if(userid!=false){
            registers_repo.add_register(userid, req.params.course_id, function(result){
                if(result == true){
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

/*
request params
session_id
course_id
*/
exports.unregister_from_channel = function(req, res){
    if(sessions_manager.is_session_id_valid(req.params.session_id)){
        var userid = sessions_manager.get_user_id_from_session(req.params.session_id);
        if(userid!=false){
            registers_repo.delete_register(userid, req.params.course_id, function(result){
                if(result == true){
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

/*
request params
session_id
tweet
>userid
>courseid
>content
>timestamp
*/
exports.send_tweet = function(req, res){
    if(sessions_manager.is_session_id_valid(req.params.session_id)){
        var userid = sessions_manager.get_user_id_from_session(req.params.session_id);
        if(userid!=false){
            var tweet = JSON.parse(req.params.tweet);
            tweet.user_id = userid;
            tweet.timestamp = new Date();
            tweets_repo.add_new(tweet, function(result){
                if(result == true){
                    //TODO send with websocket
                    res.send("success");
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