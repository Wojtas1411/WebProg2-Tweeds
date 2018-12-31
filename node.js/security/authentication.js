var session_manager = require("./sessionsManager");
var users_manager = require("../repos/users");
var shajs = require('sha.js')

var generate_new_session_id = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 30; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

var generate_random_string = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    var num = Math.floor(Math.random() * 10 + 10);

    for (var i = 0; i < num; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

//dont use this
exports.authenticate = function(req, res){

    var r1 = req.query.r1;
    var r2 = generate_random_string();

    //TODO open websocket
    var adr = req.getHeader("referer");
    var mySocket = WebSocket("target");

    mySocket.onopen = function(event){
        mySocket.send(r2);
    }

    mySocket.onmessage = function(event){
        var msg = JSON.parse(event.data);

        users_manager.get_user_by_username(msg.login, function(result){
            user = result;
            if(user==false){
                res.send("Invalid login")
            } else if(user.enabled==0){
                res.send("Invalid login")
            } else {
                var pwd_str = r1+user.password+r2;
                var hash_str = new shajs.sha256().update(pwd_str).digest('hex');
                //debug
                console.log(hash_str);
                console.log(msg.str);
                
                if(msg.str.localeCompare(hash_str) == 0){
                    // generate sessionID
                    var session = {
                        id: generate_new_session_id(),
                        user: user,
                        timestamp: new Date(),
                        address: req.getHeader("referer")
                        //TODO edit address
                    }
                    // save session
                    session_manager.add_new_session(session);
                    // respond with sessionID
                    res.send(session.id);
                } else {
                    res.send("Invalid login");
                }
            }
        });
    }
}

//dummy

var r1;
var r2;

exports.login1 = function(req, res){
    //console.log(req);
    r1 = req.params.r1;
    r2 = generate_random_string();
    console.log("Login1");
    console.log(r1);
    res.send(r2);
}

exports.login2 = function(req, res){
    var login = req.params.login;
    var hashstr = req.params.hashstr;
    console.log("Login2");

    users_manager.get_user_by_username(login, function(result){
        user = result;
            if(user==false){
                res.send("Invalid login")
            } else if(user.enabled==0){
                res.send("Invalid login")
            } else {
                var pwd_str = r1+user.password+r2;
                var hash_str = new shajs.sha256().update(pwd_str).digest('hex');
                //debug
                console.log(hash_str);
                console.log(hashstr);
                
                if(hashstr.localeCompare(hash_str) == 0){
                    // generate sessionID
                    var session = {
                        id: generate_new_session_id(),
                        user: user,
                        timestamp: new Date(),
                        // address: req.getHeader("referer")
                        //TODO edit address
                    }
                    console.log(session.id);
                    // save session
                    session_manager.add_new_session(session);
                    // respond with sessionID
                    res.send(session.id);
                } else {
                    res.send("Invalid login");
                }
            }
    });

}

exports.logout = function(req, res){
    console.log("Logout");
    console.log(req.params.session);
    session_manager.invalidate_session(req.params.session);
    res.send("OK");
}

//TODO logout