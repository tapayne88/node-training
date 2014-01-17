var fs = require('fs');

var file = process.argv[2];

fs.readFile(file, 'utf8', function(err, data) {
    var lines = data.split('\n');
    console.log(lines.length-1);
});
