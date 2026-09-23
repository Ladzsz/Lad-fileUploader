import express from 'express';
import { requireAuth } from '../../config/passport.js';
import multer from 'multer';

import { uploadfileController } from '../controllers/fileControllers.js';

const router = express.Router();

//multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

//file routes
router.post(
  '/upload',
  requireAuth,
  upload.single('file'),
  uploadfileController
);
// router.get('/:id');
// router.get('/:id/download');
// router.patch('/:id/move');
// router.delete('/:id');

export default router;
