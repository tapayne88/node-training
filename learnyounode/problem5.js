var fs = require('fs');
var path = require('path');

var dir = process.argv[2];
var ext = process.argv[3];

fs.readdir(dir, function(err, files) {
    files.forEach(function(f) {
        if (path.extname(f) == ('.'+ ext)) {
            console.log(f);
        }
    });
});
