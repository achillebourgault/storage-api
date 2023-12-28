const express = require('express');
const router = express.Router();

const apiConfiguration = require('../../../api.config');
const API_KEY = apiConfiguration.authentication.accessCodeKey;

router.get('/checkAdminAccessCode', (req, res) => {
    const key = req.query.key;

    if (key === API_KEY) {
        res.json({ valid: true });
    } else {
        res.json({ valid: false });
    }
});

module.exports = router;
