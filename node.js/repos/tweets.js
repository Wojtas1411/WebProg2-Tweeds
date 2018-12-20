client = require("../datasources/db");

exports.get_newest = function(req, res){
    client.query(
        'SELECT * FROM `tweets` ORDER BY timestamp LIMIT 10',
        function(err, results){
          if(err){
            console.log("Error getting tweets");
            console.log(err);
            res.send("ERROR")
          } else {
            console.log(JSON.stringify(results));
            res.send(JSON.stringify(results));
          }
        });
}

exports.add_new = function(tweet, callback){
  client.query(
    "INSERT INTO `tweets` (course_id, user_id, content) VALUES(?,?,?)",
    [tweet.course, tweet.user, tweet.content],
    function(err, results){
      if(err){
        console.log("Error while inserting new tweet");
        console.log(err);
        callback(false)
      } else {
        console.log("New tweet inserted succesfully")
        callback(true)
      }
    }
  );
}