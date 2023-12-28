const express = require('express');
const router = express.Router();

const apiConfiguration = require('../../../api.config');
const admin = require('firebase-admin');

router.post('/setUserDetails/:id', async (req, res) => {
    const userId = req.params.id;
    const { fullname, profilePicture } = req.body;

    const userRef = admin.firestore().collection(apiConfiguration.authentication.firestoreCollection).doc(userId);
    const doc = await userRef.get();

    if (doc.exists) {
        await userRef.update({ fullname, profilePicture });
    } else {
        await userRef.set({ fullname, profilePicture, isAdmin: false });
    }
    res.send({ message: 'User details updated successfully' });
});

module.exports = router;