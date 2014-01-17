var mm = require('./problem6-module.js');

var dir = process.argv[2];
var ext = process.argv[3];

mm(dir, ext, function(err, list) {
    console.log(list.join('\n'));
});
