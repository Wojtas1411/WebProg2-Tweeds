var express = require('express'),
    http = require('http'),
    os = require('os')

var app = express();
var WebSocket = require('ws');

var api = require("./api/functions");
var login = require("./security/authentication");
var session_manager = require("./security/sessionsManager")
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

users_repo = require("./repos/users");
reg_repo = require("./repos/registers")

app.use(function (req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Acess-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET,HEAD,POST,PUT,DELETE")
  next();
});

//test
app.get('/database', function(req, res, next) {
  // session_manager.init();
  // reg_repo.is_user_registerd_to_course(1,2, function(result){
  //   if(result){
  //     console.log("catchyea");
  //   } else {
  //     console.log("not found");
  //   }
  // });
  users_repo.list_all_users_json(req, res);
});

//get channels
app.get('/channels/:session_id', function(req, res, next){
  api.get_channels(req, res)
});
//get registered channels
app.get('/channels/reg/:session_id', function(req, res, next){
  api.get_registerd_channels(req, res);
});

// send tweet
app.put('/tweet/:session_id', function(req, res, next){
  api.send_tweet(req, res);
});

// get newest tweets
app.get('/tweet/:session_id', function(req, res, next){
  api.get_newest_tweets(req, res);
});

// register to channel
app.put('/channels/:course_id/:session_id', function(req, res, next){
  api.register_to_channel(req, res);
});

// unregister from channel
app.delete('/channels/:course_id/:session_id', function(req, res, next){
  api.unregister_from_channel(req, res);
});

//TODO login1
app.post('/login1/:r1', function(req, res, next){
  api.login1(req, res);
});
//TODO login2
app.post('/login2/:login/:hashstr', function(req, res, next){
  api.login2(req, res);
});
//TODO logout
app.post('/logout/:session', function(req, res, next){
  api.logout(req, res);
});

//create http server
const server = http.createServer(app);
//web socket server
const wss = new WebSocket.Server({ server });

wss.on('connection', function(socket, request){
  api.connection_handler(socket, request);
  socket.on('message', function(message){
    console.log(message);
  });
});

server.listen(process.env.PORT || 8081, function() {
  console.log('Listening on port ' + (process.env.PORT || 8081));
});
