client = require("../datasources/db");

exports.add_register = function(user_id, course_id, callback){
    client.execute(
        "INSERT INTO `registers` (user_id, course_id) VALUES(?,?)",
        [user_id, course_id],
        function(err, results){
            if(err){
                console.log("Failed to add new register");
                console.log(err);
                callback(false);
            } else {
                console.log("Register added succesfully");
                callback(true);
            }
        }
    )
}

exports.delete_register = function(user_id, course_id, callback){
    client.execute(
        "DELETE FROM `registers` WHERE user_id = ? AND course_id = ?",
        [user_id, course_id],
        function(err, results){
            if(err){
                console.log("Failed to add new register");
                console.log(err);
                callback(false);
            } else {
                console.log("Register added succesfully");
                callback(true);
            }
        }
    )
}