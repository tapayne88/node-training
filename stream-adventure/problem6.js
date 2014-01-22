var concat = require('concat-stream');

process.stdin
    .pipe(concat(function(strm) {
        var rts = reverse(strm.toString());
        console.log(rts);
    }))

function reverse(str) {
    return str.split('').reverse().join('');
}
