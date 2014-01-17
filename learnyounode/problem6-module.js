var path = require('path');
var fs = require('fs');

module.exports = function(dir, ext, callback) {
    var data = [];

    fs.readdir(dir, function(err, files) {
        if (err) return callback(err);

        files.forEach(function(f) {
            if (path.extname(f) == ('.'+ ext)) {
                data.push(f);
            }
        });

        callback(null, data);
    });

}
