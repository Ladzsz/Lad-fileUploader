import express from 'express';
import { requireAuth } from '../../config/passport.js';
import {
  createfolderController,
  updatefolderController,
  deletefoldercontroller,
  viewfolderController,
  movefolderController,
  viewfolderTreeController,
} from '../controllers/folderControllers.js';

const router = express.Router();

//folder routes
router.post('/', requireAuth, createfolderController);
router.get('/root', requireAuth, viewfolderTreeController);
router.get('/:id', requireAuth, viewfolderController);
router.patch('/:id/move', requireAuth, movefolderController);
router.put('/:id', requireAuth, updatefolderController);
router.delete('/:id', requireAuth, deletefoldercontroller);

export default router;
