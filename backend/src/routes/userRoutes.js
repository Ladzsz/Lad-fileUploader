import express from 'express';
import passport from 'passport';
import { requireAuth } from '../../config/passport.js';
import {
  createUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/userControllers.js';

const router = express.Router();

//user routes
router.post('/', createUserController);
router.put('/me', requireAuth, updateUserController);
router.delete('/me', requireAuth, deleteUserController);

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Logged in successfully' });
});

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

export default router;
