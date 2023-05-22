const functions = require('firebase-functions');
const fastify = require('fastify');
const files = require('./routes/packaging');

const app = fastify({ logger: true });

app.register(files);

const handler = async (req, res) => {
    try {
        await app.ready();
        app.server.emit('request', req, res);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

exports.app = functions.https.onRequest(handler);
