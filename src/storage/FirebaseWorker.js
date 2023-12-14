const admin = require('firebase-admin');
const apiConfiguration = require('../../api.config');

const firestoreCollection = apiConfiguration.collectionName;

// Retrieve all documents from the specified Firestore collection
async function getAllDocuments() {
    try {
        const snapshot = await admin.firestore().collection(firestoreCollection).get();
        return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    } catch (error) {
        console.error('ERROR Could not retrieve documents from Firestore');
        console.error('ERROR ', error);
        return [];
    }
}

// Retrieve a document by its ID from the specified Firestore collection
async function getDocumentById(docId) {
    try {
        const docRef = admin.firestore().collection(firestoreCollection).doc(docId);
        const doc = await docRef.get();

        if (!doc.exists) {
            console.log(`INFO Document with ID ${docId} not found in Firestore`);
            return undefined;
        }

        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error('ERROR Could not retrieve document from Firestore');
        console.error('ERROR ', error);
        return undefined;
    }
}

// Save a document to the specified Firestore collection
async function saveDocument(docId, content, callback) {
    try {
        await admin.firestore().collection(firestoreCollection).doc(docId).set(content);
        if (callback) callback();
        return true;
    } catch (error) {
        console.error('ERROR Could not save document to Firestore');
        console.error('ERROR ', error);
        return false;
    }
}

// Delete a document by its ID from the specified Firestore collection
async function deleteDocument(docId, callback) {
    try {
        await admin.firestore().collection(firestoreCollection).doc(docId).delete();
        if (callback) callback();
        return true;
    } catch (error) {
        console.error('ERROR Could not delete document from Firestore');
        console.error('ERROR ', error);
        return false;
    }
}

module.exports = {
    getAllDocuments,
    saveDocument,
    deleteDocument,
    getDocumentById,
};
