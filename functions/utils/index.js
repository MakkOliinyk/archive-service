const { createGzip, createGunzip } = require('zlib');

const archiveFile = (fileContent) => {
    return new Promise((resolve, reject) => {
        const gzip = createGzip();
        const chunks = [];

        gzip.on('data', (chunk) => {
            chunks.push(chunk);
        });

        gzip.on('end', () => {
            const compressedContent = Buffer.concat(chunks);
            resolve(compressedContent);
        });

        gzip.on('error', (error) => {
            reject(error);
        });

        gzip.write(fileContent);
        gzip.end();
    });
};

const unarchiveFile = (fileContent) => {
    return new Promise((resolve, reject) => {
        const gunzip = createGunzip();
        const chunks = [];

        gunzip.on('data', (chunk) => {
            chunks.push(chunk);
        });

        gunzip.on('end', () => {
            const decompressedContent = Buffer.concat(chunks);
            resolve(decompressedContent);
        });

        gunzip.on('error', (error) => {
            reject(error);
        });

        gunzip.write(fileContent);
        gunzip.end();
    });
};

module.exports = { archiveFile, unarchiveFile };
