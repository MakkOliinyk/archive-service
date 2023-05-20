import fastify from 'fastify';

import files from './routes/archivation';

const app = fastify({ logger: true });

app.register(files);

const start = async () => {
    try {
        await app.listen(process.env.PORT || 5000, '0.0.0.0');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
