const functions = require('firebase-functions');
const fastify = require('fastify');
const files = require('./routes/packaging');

let requestHandler = null;

const app = fastify({
    logger: true,
    serverFactory: (handler) => {
        requestHandler = handler;
        return require('http').createServer();
    },
});

app.addContentTypeParser('application/json', {}, (req, body, done) => {
    done(null, body.body);
});

app.register(files);

exports.app = functions.https.onRequest((req, res) => {
    app.ready((err) => {
        if (err) throw err;
        requestHandler(req, res);
    });
});
