var through = require('through');

var tr = through(function(bfr) {
    this.queue(bfr.toString().toUpperCase());
});

process.stdin.pipe(tr).pipe(process.stdout);
