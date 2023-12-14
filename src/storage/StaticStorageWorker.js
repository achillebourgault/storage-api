const fs = require('fs').promises;
const apiConfiguration = require('../../api.config');

const folderPath = apiConfiguration.documentsFolder + '/' + apiConfiguration.collectionName

async function getAllDocuments() {
    try {
        const files = await fs.readdir(folderPath);
        const documents = await Promise.all(
            files.map(async (file) => {
                try {
                    const filePath = `${folderPath}/${file}`;
                    const fileContent = await fs.readFile(filePath, 'utf8');
                    return JSON.parse(fileContent);
                } catch (error) {
                    console.error('Could not read product object from file:', file);
                    console.error('', error);
                    return null;
                }
            })
        );
        return documents.filter((document) => document !== null);
    } catch (error) {
        console.error('Could not read documents folder:', folderPath);
        console.error('', error);
        return [];
    }
}

async function getDocumentById(docName) {
    const filePath = `${folderPath}/${docName}.json`;

    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`INFO   File ${filePath} not found`);
            return undefined;
        } else {
            console.error('Could not read product object from file: ', docName);
            console.error('', error);
            return undefined;
        }
    }
}

async function saveDocument(docName, content, callback) {
    const filePath = `${folderPath}/${docName}.json`;
    const fileContent = JSON.stringify(content);

    try {
        await fs.writeFile(filePath, fileContent);
        if (callback) callback();
        return true;
    } catch (error) {
        console.error(`Could not save file ${filePath}: `, error);
        return false;
    }
}

async function deleteDocument(docName, callback) {
    const filePath = `${folderPath}/${docName}.json`;

    try {
        await fs.unlink(filePath);
        if (callback) callback();
        return true;
    } catch (error) {
        if (error.code === 'ENOENT')
            console.log(`INFO   File ${filePath} not found, deletion skipped`)
        else
            console.error(`Could not delete file ${filePath}: `, error);
        return false;
    }
}

async function updateDocument(docName, content, callback) {
    const filePath = `${folderPath}/${docName}.json`;
    const fileContent = JSON.stringify(content);

    try {
        await fs.writeFile(filePath, fileContent);
        if (callback) callback();
        return true;
    } catch (error) {
        console.error(`Could not update file ${filePath}: `, error);
        return false;
    }
}

module.exports = {
    getAllDocuments,
    saveDocument,
    deleteDocument,
    getDocumentById,
    updateDocument,
};
