import { archiveFile, unarchiveFile } from '../utils';

const fileRoutes = async (server, options) => {
    server.route({
        method: 'POST',
        path: '/archive',
        handler: async (request, reply) => {
            const fileContent = request.body.file;
            const compressedContent = await archiveFile(fileContent);
            reply.type('application/octet-stream').send(compressedContent);
        },
    });

    server.route({
        method: 'POST',
        path: '/unarchive',
        handler: async (request, reply) => {
            const fileContent = request.body.file;
            const decompressedContent = await unarchiveFile(fileContent);
            reply.type('application/octet-stream').send(decompressedContent);
        },
    });
};

export default fastifyPlugin(fileRoutes);
