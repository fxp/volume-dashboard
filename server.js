var express = require('express');
var app = express();
// var http = require('http').Server(app);
var https = require('https');
var fs = require('fs')

app.use(express.static('public'))

let server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(3000, function () {
        console.log('Example app listening on port 3000! Go to https://localhost:3000/')
    })

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('an user connected');
    socket.on('volume', (v)=>{
        io.emit('volume', v);
    })
});