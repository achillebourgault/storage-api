const express = require('express');
const bodyParser = require('body-parser');
const apiConfig = require('../api.config');
const {err} = require("./utils/term");

const app = express();

app.use(bodyParser.json());

if (checkConfigurationIntegrity(apiConfig)) {
    const apiRoutes = require(`./api/${apiConfig.apiVersion}/api`);
    const authRoutes = require('./api/auth/api');

    app.use(`/${apiConfig.apiVersion}/`, apiRoutes);
    app.use(`/`, authRoutes);

    try {
        app.listen(apiConfig.port, () => {
            console.log(`Server is running on port ${apiConfig.port}`);
            console.log(`API version: ${apiConfig.apiVersion}`);
            console.log(`API URL: ${apiConfig.baseUrl}:${apiConfig.port}/${apiConfig.apiVersion}`);
        });
    } catch (error) {
        err('Could not start Storage API server', error);
    }
}

function checkConfigurationIntegrity(apiConfig) {
    let integrity = true;

    if (!apiConfig) {
        err('API configuration not found');
        return false;
    }

    if (!apiConfig.baseUrl) {
        err('API base URL not found in configuration');
        integrity = false;
    }

    if (!apiConfig.apiVersion) {
        err('API version not found in configuration');
        return false;
    }

    if (apiConfig.apiVersion !== 'v1' && apiConfig.apiVersion !== 'v2') {
        err('API version not supported');
        integrity = false;
    }

    if (!apiConfig.port) {
        err('API port not found in configuration');
        integrity = false;
    }

    if (apiConfig.apiVersion === 'v1' && !apiConfig.documentsFolder) {
        err('Documents folder not found in configuration');
        integrity = false;
    }

    if (apiConfig.apiVersion === 'v2' && !apiConfig.firebaseServiceAccountKey) {
        err('Firebase Service Account Key not found in configuration');
        integrity = false;
    }

    if (apiConfig.authentication) {
        if (apiConfig.authentication?.enabled && !apiConfig.authentication?.firestoreCollection) {
            err('Authentication enabled but Firestore collection not found in configuration');
            integrity = false;
        }
    }
    return integrity;
}