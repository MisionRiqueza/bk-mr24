const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    registerUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    googleAuth,
    googleCallback
} = require('../controllers/userController');

// Registro de usuario
router.post('/register', registerUser);

// Obtener todos los usuarios
router.get('/', getUsers);

// Obtener un usuario por ID
router.get('/:id', getUserById);

// Modificar un usuario por ID
router.put('/:id', updateUser);

// Eliminar un usuario por ID
router.delete('/:id', deleteUser);

// Login de usuario
router.post('/login', loginUser);

// Autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback de Google
router.get('/google/callback', googleCallback);



module.exports = router;
