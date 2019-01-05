var shajs = require('sha.js');

var session = null;
var timestamp = null;

var generate_new_session_id = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 30; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

exports.is_session_valid = function(session_id){
    if(session_id.localeCompare(session)==0 && new Date().getTime()-timestamp.getTime()<10*60*1000){
        return true;
    } else {
        session = null;
        timestamp = null;
        return false;
    }
}

exports.login = function(login, hashpwd){
    console.log(login, hashpwd);
    var my_pwd = new shajs.sha256().update("admin").digest('hex')
    console.log(my_pwd);
    if(login.localeCompare("root")==0 && hashpwd.localeCompare(my_pwd)==0){
        session = generate_new_session_id();
        timestamp = new Date();
        return session
    } else {
        return false
    }
}

exports.invalidate = function(){
    session = null;
    timestamp = null;
}
