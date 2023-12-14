const express = require('express');

const productsGetAll = require('./collections/getAll');
const productsDetails = require('./collections/details');
const productsEdit = require('./collections/edit');
const productsDelete = require('./collections/delete');
const productsCreate = require('./collections/create');
const {promises: fs} = require("fs");
const {getAllDocuments} = require("../../storage/StaticStorageWorker");
const apiConfiguration = require("../../../api.config");

const router = express.Router();

const termColors = require("../../utils/term");
const {success, err} = require("../../utils/term");

router.use('/products', productsGetAll);
router.use('/products', productsDetails);
router.use('/products', productsEdit);
router.use('/products', productsDelete);
router.use('/products', productsCreate);

async function initialize() {
    const folderPath = apiConfiguration.documentsFolder;

    try {
        await fs.mkdir(folderPath, { recursive: true });
        await fs.mkdir(`${folderPath}/${apiConfiguration.collectionName}`, { recursive: true });
    } catch (error) {
        err("Could not initialize Static Storage Worker:", error);
    }
}

initialize().then(() => {
    success("Static Storage Worker initialized successfully\n");
});

module.exports = router;