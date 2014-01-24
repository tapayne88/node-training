var request = require('request');
var async = require('async');
var crypto = require('crypto');

request('http://flaky.herokuapp.com/list', function(err, resp, body) {
    var token = resp.headers['x-auth-token'];

    var options = {
        method: "POST",
        headers: {
            'x-auth-token': token
        },
        json: {
            'password': 'supersecret'
        }
    };

    request('http://flaky.herokuapp.com/login', options, function(err, resp, body) {
        options.method = 'GET';

        request('http://flaky.herokuapp.com/list', options, function(err, resp, body) {

            async.map(body, function(item, done) {

                var options = { headers: { 'x-auth-token': token } };
                request('http://flaky.herokuapp.com'+ item, options, function(err, res, body) {
                    var md5 = crypto.createHash('md5');
                    md5.update(body)

                    var num = item.split('/').slice(-1);

                    var obj = {};
                    obj[num] = md5.digest('hex');
                    return done(null, obj);
                });

            }, function(err, result) {

                var postData = {};
                result.forEach(function(item) {
                    var key = Object.keys(item);
                    var value = item[key];
                    postData[key] = value;
                });

                options.method = "POST";
                options.json = postData;

                request('http://flaky.herokuapp.com/verify', options, function(err, resp, body) {
                    console.log(body);
                });
            });
        });
    });
});
