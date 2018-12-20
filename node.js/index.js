var express = require('express'),
    http = require('http'),
    os = require('os')

var app = express();

// console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);

users_repo = require("./repos/users")

app.get('/database', function(req, res, next) {
  users_repo.list_all_users_json(req, res);
});

http.createServer(app).listen(process.env.PORT || 8081, function() {
  console.log('Listening on port ' + (process.env.PORT || 8081));
});
