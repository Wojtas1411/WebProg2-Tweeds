var express = require('express'),
    http = require('http'),
    os = require('os')

var app = express();

var api = require("./api/functions");
var login = require("./security/authentication");
var session_manager = require("./security/sessionsManager")

users_repo = require("./repos/users");

//test
app.get('/database', function(req, res, next) {
  session_manager.init();
  users_repo.list_all_users_json(req, res);
});

//get channels
app.get('/channels', function(req, res, next){
  api.get_channels(req, res)
});

// send tweet
app.put('/tweet', function(req, res, next){
  api.send_tweet(req, res);
});

// get newest tweets
app.get('/tweet', function(req, res, next){
  api.get_newest_tweets(req, res);
});

// register to channel
app.put('/channels', function(req, res, next){
  api.register_to_channel(req, res);
});

// unregister from channel
app.delete('/channels', function(req, res, next){
  api.unregister_from_channel(req, res);
})

http.createServer(app).listen(process.env.PORT || 8081, function() {
  console.log('Listening on port ' + (process.env.PORT || 8081));
});
