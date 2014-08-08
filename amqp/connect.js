var amqp = require('amqp');

module.exports = function(callback) {
    var connection = amqp.createConnection(
        { url: "amqp://guest:guest@192.168.1.75:5672/conglomerate" },
        { reconnect: false }
    );

    connection.on('ready', callback.bind(null, connection));
}
