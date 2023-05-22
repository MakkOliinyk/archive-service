import { createGzip, createGunzip } from 'zlib';

export const archiveFile = (fileContent) => {
    const gzip = createGzip();

    return new Promise((resolve, reject) => {
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

export const unarchiveFile = (fileContent) => {
    const gunzip = createGunzip();

    return new Promise((resolve, reject) => {
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
