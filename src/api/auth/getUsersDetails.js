const express = require('express');
const router = express.Router();

const apiConfiguration = require('../../../api.config');
const admin = require('firebase-admin');

router.get('/getUsersDetails', async (req, res) => {
    const usersRef = admin.firestore().collection(apiConfiguration.authentication.firestoreCollection);
    const snapshot = await usersRef.get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(users);
});

module.exports = router;