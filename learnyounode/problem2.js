var nums = process.argv.slice(2);

var total = 0;
nums.forEach(function(i) {
    total += Number(i);
});

console.log(total);
