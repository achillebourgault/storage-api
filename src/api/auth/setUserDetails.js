const express = require('express');
const router = express.Router();

const apiConfiguration = require('../../../api.config');
const admin = require('firebase-admin');

router.post('/setUserDetails/:id', async (req, res) => {
    const userId = req.params.id;
    const { fullname, profilePicture, isAdmin } = req.body;

    const userRef = admin.firestore().collection(apiConfiguration.authentication.firestoreCollection).doc(userId);
    const doc = await userRef.get();

    try {
        if (doc.exists) {
            await userRef.update({ fullname, profilePicture, isAdmin });
        } else {
            await userRef.set({ fullname, profilePicture, isAdmin });
        }
        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Could not update user details' });
    }
});

module.exports = router;