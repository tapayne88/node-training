var http = require('http');

var url = process.argv[2];

http.get(url, function(resp) {
    var data = [];
    resp.setEncoding('utf8');
    resp.on('data', function(d) {
        data.push(d);
    });
    resp.on('end', function() {
        console.log(data.join('').length);;
        console.log(data.join(''));
    });
    resp.on('error', console.error);
});
