client = require("../datasources/db");

exports.get_newest = function(req, res){
    client.query(
        'SELECT * FROM `tweets` ORDER BY timestamp LIMIT 10',
        function(err, results, fields){
          if(err) throw(err);
          console.log(JSON.stringify(results));
          res.send(JSON.stringify(results));
        });
}