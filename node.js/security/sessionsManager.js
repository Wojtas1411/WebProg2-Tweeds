
var sessions = [];

//test - generate test session and add it to sessions - to test api
var users_repo = require("../repos/users");

exports.init = function(){
    users_repo.get_user_by_username("test",function(result){
        if(result==null){
            console.log("Unable to get user - init failed");
        } else {
            console.log(JSON.stringify(result));
            var test = {
                id:"0",
                user: result,
                timestamp: new Date()
            }

            console.log(JSON.stringify(test));
            
            sessions[sessions.length] = test;
        }
    });
    
}


exports.add_new_session = function(session){
    for(var i=0; i<sessions.length; i++){
        if(sessions[i].user.username.localeCompare(session.user.username)==0){
            sessions.splice(i,1)
            break;
        }
    }

    sessions[sessions.length] = session;
}

var invalidate_expired_sessions = function(){
    var i=0;
    while(i<sessions.length){
        if(new Date().getTime() - sessions[i].timestamp.getTime()>(30*60*1000)){ //30 session expires in 20 minuites
            sessions.splice(i,1);
        } else {
            i++;
        }
    }
}
exports.invalidate_expired_sessions;

exports.is_session_id_valid = function(session_id){
    invalidate_expired_sessions();
    for(var i=0; i<sessions.length; i++){
        if(session_id.localeCompare(sessions[i].id)==0){
            return true;
        }
    }
    return false;
}

exports.invalidate_session = function(session_id){
    for(var i=0; i<sessions.length; i++){
        if(session_id.localeCompare(sessions[i].id)==0){
            sessions.splice(i,1)
            break;
        }
    }
}

exports.get_user_id_from_session = function(session_id){
    invalidate_expired_sessions();
    console.log(sessions.length);
    for(var i=0; i<sessions.length; i++){
        if(session_id.localeCompare(sessions[i].id)==0){
            return sessions[i].user.id;
        }
    }
    return false;
}

exports.get_username_from_session = function(session_id){
    invalidate_expired_sessions();
    for(var i=0; i<sessions.length; i++){
        if(session_id.localeCompare(sessions[i].id)==0){
            return sessions[i].user.username;
        }
    }
    return false;
}