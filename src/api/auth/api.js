const express = require('express');

const authCheckAdminAccessCode = require('./checkAdminAccessCode');
const authSetUserDetails = require('./setUserDetails');
const authGetUserDetails = require('./getUserDetails');
const authGetUsersDetails = require('./getUsersDetails');

const router = express.Router();

router.use('/auth', authCheckAdminAccessCode);
router.use('/auth', authSetUserDetails);
router.use('/auth', authGetUserDetails);
router.use('/auth', authGetUsersDetails);

module.exports = router;