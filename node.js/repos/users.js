client = require("../datasources/db");

exports.list_all_users_json = function(req, res){
    client.query(
        'SELECT * FROM `users`',
        function(err, results, fields){
          if(err) throw(err);
          console.log(JSON.stringify(results));
          res.send(JSON.stringify(results));
        });
        
}

exports.get_pwd_by_username = function(username, callback){
    client.execute(
        "SELECT `password` FROM `users` WHERE `username`=?",
        [username],
        function(err, results, fields){
            if(err) throw err;
            callback(results[0].password);
        }
    );
}

exports.get_user_by_username = function(username, callback){
    client.execute(
        "SELECT * FROM `users` WHERE `username`=?",
        [username],
        function(err, results, fields){
            if(err){
                console.log("User not found");
                console.log(err);
                callback(false);
            } else {
                console.log("User found");
                callback(results[0]);
            }
        }
    )
}

exports.disable_user = function(id){
    client.execute(
        "UPDATE 'users' SET enabled = 0 WHERE id = ?",
        [id],
        function(err, results, fields){
            if(err) throw err;
            console.log("User with id ${id} disabled")
            console.log(results);
        }
    )
}

exports.enable_user = function(id){
    client.execute(
        "UPDATE 'users' SET enabled = 1 WHERE id = ?",
        [id],
        function(err, results, fields){
            if(err) throw err;
            console.log("User with id ${id} enabled")
            console.log(results);
        }
    )
}

exports.create_user = function(user){
    client.execute(
        "INSERT INTO `users` (username, password, active) VALUES(?, ?, ?)",
        [user.username, user.password, user.active],
        function(err, results){
            if(err) throw err;
            console.log("User ${user.username} added");
            console.log(results);
        }
    )
}