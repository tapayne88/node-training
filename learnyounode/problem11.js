var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    var fileStream = fs.createReadStream(process.argv[3]);
    fileStream.pipe(res);
});

console.log(process.argv);
server.listen(process.argv[2]);
