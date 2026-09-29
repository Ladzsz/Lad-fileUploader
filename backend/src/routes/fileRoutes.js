import express from 'express';
import { requireAuth } from '../../config/passport.js';
import multer from 'multer';

import {
  uploadfileController,
  accessfileController,
  editfilenamecontroller,
  deletefilecontroller,
} from '../controllers/fileControllers.js';

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

router.get('/:id/access', requireAuth, accessfileController);
//router.get('/root'); get from root
router.patch('/:id/editname', requireAuth, editfilenamecontroller);
// router.patch('/:id/move'); file position
router.delete('/:id/delete', requireAuth, deletefilecontroller);

export default router;
