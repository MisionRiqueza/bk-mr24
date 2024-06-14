require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/mongodb');
const passport = require('passport');
const firebaseAdmin = require('./config/firebase');
const MongoStore = require('connect-mongo');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Middleware de Passport
app.use(passport.initialize());
app.use(passport.session());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/UserRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
