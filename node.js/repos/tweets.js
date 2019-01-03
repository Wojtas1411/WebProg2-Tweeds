client = require("../datasources/db");
session_manager = require("../security/sessionsManager")

exports.get_newest = function(req, res){
  var userid = session_manager.get_user_id_from_session(req.params.session_id);
  if(userid==false){
    res.send("error");
  } else {
    client.execute(
      'SELECT * FROM `tweets` WHERE course_id in(SELECT course_id FROM registers WHERE user_id=?) ORDER BY timestamp DESC LIMIT 10',
      [userid],
      function(err, results){
        if(err){
          console.log("Error getting tweets");
          console.log(err);
          res.send("error")
        } else {
          console.log(JSON.stringify(results));
          res.send(JSON.stringify(results));
        }
      });
  }
}

exports.add_new = function(tweet, callback){
  client.execute(
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