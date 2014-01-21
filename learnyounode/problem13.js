var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
    var parts = url.parse(req.url, true);

    res.setHeader('Content-Type', 'application/json');
    switch(parts.pathname) {
        case '/api/parsetime':
            var time = parseTime(parts.query.iso);
            res.end(JSON.stringify(time));
            break;
        case '/api/unixtime':
            var time = unixTime(parts.query.iso);
            res.end(JSON.stringify(time));
            break;
        default:
            res.statusCode = 404;
            res.end();
    }
});

function parseTime(time) {
    var datetime = new Date(time);
    return {
        hour: datetime.getHours(),
        minute: datetime.getMinutes(),
        second: datetime.getSeconds()
    };
}

function unixTime(time) {
    var datetime = new Date(time);
    return { unixtime: datetime.valueOf() };
}

server.listen(process.argv[2]);
