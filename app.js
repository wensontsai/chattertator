var express = require("express");
var app = express();
var port = process.env.PORT || 3700;

// app.get("/", function(req,res){
//   res.send("It works!");
// });


/////
// wiring up jade templating
////
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get("/", function(req,res){
  res.render("page");
});

app.use(express.static(__dirname + '/public'));



// app.listen(port);


/////////
// adding socket.io
/////////
var io = require('socket.io').listen(app.listen(port));


io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to the Chattertator where DREAMS HAPPEN' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + port);
