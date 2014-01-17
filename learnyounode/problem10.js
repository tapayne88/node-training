var net = require('net');
var util = require('util');

function prependZero(num) {
    return ((num < 10) ? '0' : '') + num;
}

function getNow() {
    var date = new Date();
    dateStr = util.format(
        '%s-%s-%s %s:%s',
        prependZero(date.getFullYear()),
        prependZero(date.getMonth()+1),
        prependZero(date.getDate()),
        prependZero(date.getHours()),
        prependZero(date.getMinutes())
    );
    return dateStr;
}

var server = net.createServer(function(socket) {
    socket.end(getNow() + '\n');
});

server.listen(process.argv[2]);
