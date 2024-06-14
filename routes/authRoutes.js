const express = require('express');
const { googleLogin, smsLogin } = require('../controllers/authController');
const { firebaseAuth } = require('../controllers/authController');

const router = express.Router();

router.post('/google', googleLogin);
router.post('/sms', smsLogin);


// Login de firebase
router.post('/firebase-auth', firebaseAuth);

module.exports = router;
