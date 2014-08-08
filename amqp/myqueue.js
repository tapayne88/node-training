var markdown = require('markdown').markdown;

require('./connect.js')(function(amqp) {
    amqp.queue('documents.ready', {noDeclare: true}, function(q) {
        q.subscribe({ack: true, prefetchCount: 1}, function(body, headers, info, message) {
            var html = markdown.toHTML(body.markdown);
            console.log(html);

            message.acknowledge();
        })
    })
})
