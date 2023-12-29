const express = require('express');
const router = express.Router();

const { getDocumentById, updateDocument } = require("../../../storage/FirebaseWorker");

router.post('/edit/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedFields = req.body;
    let product = await getDocumentById(productId);

    if (!product)
        return res.status(404).json({error: 'Document not found'});
    for (const [key, value] of Object.entries(updatedFields)) product[key] = value;
    await updateDocument(productId, product);
    res.status(200).json({message: 'Document updated successfully', product: product}).end();
});

module.exports = router;
