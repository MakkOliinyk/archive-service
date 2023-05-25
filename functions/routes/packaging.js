const multer = require('fastify-multer');

const { archiveFile, unarchiveFile } = require('../utils');

const packagingRoutes = async (server) => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    server.register(multer.contentParser);

    server.post('/archive', { preHandler: upload.any() }, async (request, reply) => {
        try {
            const buffer = request.raw.body;
            const compressedContent = await archiveFile(buffer);
            reply.header('Content-Disposition', 'attachment; filename="compressedFile.gz"');
            reply.type('application/octet-stream').send(compressedContent);
        } catch (error) {
            reply.send(error);
        }
    });

    server.post('/unarchive', { preHandler: upload.any() }, async (request, reply) => {
       try {
            const buffer = request.raw.body;
            const decompressedContent = await unarchiveFile(buffer);
            reply.type('application/octet-stream').send(decompressedContent);
        } catch (error) {
            reply.send(error);
        }
    });
};

module.exports = packagingRoutes;
