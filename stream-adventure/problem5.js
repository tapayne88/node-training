var through = require('through');
var split = require('split');

var num = 1;
process.stdin
    .pipe(split())
    .pipe(through(function(bfr) {
        if (num % 2  == 0) {
            this.queue(bfr.toString().toUpperCase() +'\n');
        } else {
            this.queue(bfr.toString().toLowerCase() +'\n');
        }
        num++
    }))
    .pipe(process.stdout);
