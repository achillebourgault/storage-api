const express = require('express');
const {getAllDocuments} = require("../../../storage/StaticStorageWorker");
const {err} = require("../../../utils/term");
const router = express.Router();

router.get('/getAll', async (req, res) => {
    try {
        const documents = await getAllDocuments();
        res.json(documents);
    } catch (error) {
        err('Error fetching documents:', error);
        res.status(500).json({error: 'Error fetching documents'});
    }
});

module.exports = router;