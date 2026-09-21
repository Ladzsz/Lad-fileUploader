import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import userRoutes from './src/routes/userRoutes.js';
import folderRoutes from './src/routes/folderRoutes.js';
import configurePassport from './config/passport.js';

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
configurePassport(passport);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/folders', folderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
