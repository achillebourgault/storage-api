const express = require('express');
const router = express.Router();

const { getDocumentById } = require("../../../storage/StaticStorageWorker");
const {err} = require("../../../utils/term");

router.get('/details/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await getDocumentById(productId);

        if (!product) res.status(404).json({error: `Document '${productId}' not found`});
        else res.json(product);
    } catch (error) {
        err('Error fetching document details:', error);
        res.status(500).json({error: 'Error fetching document details'});
    }
});

module.exports = router;
