var http = require('http');

var resps = [];
var count = 0;

function printResults() {
    for(var i = 0; i < 3; i++) {
        console.log(resps[i]);
    }
}

function getUrl(ind) {
    http.get(process.argv[2+ind], function(resp) {
        var data = [];
        resp.setEncoding('utf8');
        resp.on('data', function(d) {
            data.push(d);
        });
        resp.on('end', function() {
            resps[ind] = data.join('');
            count++;

            if (count === 3) {
                printResults();
            }
        });
        resp.on('error', console.error);
    });
}

for(var i = 0; i < 3; i++) {
    getUrl(i);
}
