const express = require('express');
const { saveDocument } = require("../../../storage/FirebaseWorker");
const {err} = require("../../../utils/term");
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const {title, description, price, images} = req.body;
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        if (!title || !description || !price || !images) {
            res.status(400).json({error: 'Missing parameters'});
            return;
        }

        const newProduct = {
            id,
            title,
            description,
            price,
            images,
        };

        await saveDocument(id, newProduct, () => {
            res.status(201).json(newProduct);
        });
    } catch (error) {
        err('Error while creating new document:', error);
        res.status(500).json({error: 'Internal error while creating new document'});
    }
});

module.exports = router;