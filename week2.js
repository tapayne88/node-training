var request = require('request');
var async = require('async');
var crypto = require('crypto');

function Flaky() {
    this.host = 'http://flaky.herokuapp.com';
    this.token;
}

Flaky.prototype.getList = function(callback) {
    var options = this.getOptions();

    this.requestUrl('/list', options, callback);
}

Flaky.prototype.getOptions = function() {
    var options = { headers: {} };
    if (this.token) {
        options.headers['x-auth-token'] = this.token;
    }

    return options;
}

Flaky.prototype.requestUrl = function(url, options, callback) {
    var flaky = this;

    var newUrl = this.host + url;
    request(newUrl, options, function(err, res, body) {
        if (err) {
            console.log('failed, retrying...');
            return flaky.requestUrl(url, options, callback);
        }

        flaky.token = res.headers['x-auth-token'];
        options.headers['x-auth-token'] = flaky.token;

        // Need to do login
        if (res.statusCode == 401) {
            return flaky.doLogin(function(a,b,c) {
                // now try request
                flaky.requestUrl(url, options, callback);
            });
        }

        callback(body);
    });
}

Flaky.prototype.doLogin = function(callback) {
    var options = this.getOptions();
    options.method = 'POST';
    options.json = {
        password: 'supersecret'
    }

    this.requestUrl('/login', options, callback);
}

Flaky.prototype.fetchFileHashes = function(files, callback) {
    var flaky = this;

    var options = this.getOptions();

    async.map(files, function(item, done) {
        flaky.requestUrl(item, options, function(data) {
            var md5 = crypto.createHash('md5');
            md5.update(body)

            var num = item.split('/').slice(-1);

            var obj = {};
            obj[num] = md5.digest('hex');
            return done(null, obj);
        });
    }, callback);
}

Flaky.prototype.verifyFiles = function(err, result) {
    var postData = {};
    result.forEach(function(item) {
        var key = Object.keys(item);
        var value = item[key];
        postData[key] = value;
    });

    var options = this.getOptions();
    options.method = 'POST';
    options.json = result;

    this.requestUrl('/verify', options, function(err, resp, body) {
        console.log(body);
    });
}

var flaky = new Flaky();
flaky.getList(function(data) {
    flaky.fetchFileHashes(data, flaky.verifyFiles);
});

/*
var token;
var retries = 0;


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
*/
