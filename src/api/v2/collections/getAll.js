const express = require('express');
const {getAllDocuments} = require("../../../storage/FirebaseWorker");
const router = express.Router();

router.get('/getAll', async (req, res) => {
    try {
        const documents = await getAllDocuments();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({error: 'Error fetching documents'});
    }
});

module.exports = router;