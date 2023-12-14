const express = require('express');

const productsGetAll = require('./collections/getAll');
const productsDetails = require('./collections/details');
const productsEdit = require('./collections/edit');
const productsDelete = require('./collections/delete');
const productsCreate = require('./collections/create');
const apiConfiguration = require("../../../api.config");

const admin = require("firebase-admin");

const termColors = require("../../utils/term");
const {success, err} = require("../../utils/term");

const router = express.Router();

router.use('/products', productsGetAll);
router.use('/products', productsDetails);
router.use('/products', productsEdit);
router.use('/products', productsDelete);
router.use('/products', productsCreate);

function initialize() {
    const serviceAccount = apiConfiguration.firebaseServiceAccountKey;

    if (!serviceAccount) {
        console.error('Firebase Service Account Key not found in configuration');
        return;
    }

    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        success("Firebase Worker initialized successfully\n");
    } catch (error) {
        err('Error initializing Firebase Admin:', error);
    }
}

initialize();

module.exports = router;