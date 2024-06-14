const admin = require('../config/firebase');
const User = require('../models/User');
const firebaseAdmin = require('firebase-admin');

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email } = decodedToken;

        let user = await User.findOne({ googleId: uid });

        if (!user) {
            user = await User.create({ googleId: uid, email, password: 'default' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.smsLogin = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        const verification = await admin.auth().verifyIdToken(otp);

        if (verification.phone_number !== phoneNumber) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        let user = await User.findOne({ phoneNumber });

        if (!user) {
            user = await User.create({ phoneNumber });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.firebaseAuth = async (req, res) => {
    const { idToken } = req.body;

    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
        const { uid, email } = decodedToken;
        // Aquí podrías realizar acciones adicionales como crear una sesión de usuario, etc.
        res.json({
            message: "Firebase authentication successful",
            user: { uid, email }
        });
    } catch (error) {
        console.error("Error verifying Firebase token:", error);
        res.status(401).json({ error: "Firebase authentication failed" });
    }
};
