const express = require('express');
const router = express.Router();

const apiConfiguration = require('../../../api.config');
const admin = require('firebase-admin');

router.get('/getUserDetails/:id', async (req, res) => {
    const userId = req.params.id;
    const userRef = admin.firestore().collection(apiConfiguration.authentication.firestoreCollection).doc(userId);
    const doc = await userRef.get();

    if (doc.exists) {
        await res.status(200).json(doc.data());
    } else {
        await res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;