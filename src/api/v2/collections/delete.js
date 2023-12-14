const express = require('express');
const router = express.Router();
const { deleteDocument } = require("../../../storage/FirebaseWorker");
const {err} = require("../../../utils/term");

router.delete('/delete/:id', (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = deleteDocument(productId);

        if (!deletedProduct)
            res.status(404).json({error: 'Document not found'});
        else
            res.json({ message: 'Document deleted'});
    } catch (error) {
        err('Error deleting document:', error);
        res.status(500).json({ error: 'Error deleting document' });
    }
});

module.exports = router;