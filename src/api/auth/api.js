const express = require('express');

const authCheckAdminAccessCode = require('./checkAdminAccessCode');
const authSetUserDetails = require('./setUserDetails');

const router = express.Router();

router.use('/auth', authCheckAdminAccessCode);
router.use('/auth', authSetUserDetails);

module.exports = router;