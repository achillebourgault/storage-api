const express = require('express');

const authCheckAdminAccessCode = require('./checkAdminAccessCode');
const authSetUserDetails = require('./setUserDetails');
const authGetUserDetails = require('./getUserDetails');

const router = express.Router();

router.use('/auth', authCheckAdminAccessCode);
router.use('/auth', authSetUserDetails);
router.use('/auth', authGetUserDetails);

module.exports = router;