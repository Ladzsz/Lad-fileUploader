import prisma from '../lib/prisma.js';
import supabase from '../../config/supabase.js';

//function to grab file by its user
const grabfileByUser = async (req) => {
  const file = await prisma.file.findFirst({
    where: {
      id: Number(req.params.id),
      userId: req.user.id,
    },
  });

  return file;
};

//upload file
export const uploadfileController = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: 'No file uploaded',
      });
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filepath = `users/${req.user.id}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('upload')
      .upload(filepath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data: urlData } = supabase.storage
      .from('upload')
      .getPublicUrl(data.path);

    const fileUrl = urlData.publicUrl;

    const newFile = await prisma.file.create({
      data: {
        name: fileName,
        url: fileUrl,
        path: filepath,
        size: file.size,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: 'File uploaded successfully',
      file: newFile,
    });
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//access file
export const accessfileController = async (req, res) => {
  try {
    const file = await grabfileByUser(req);

    if (!file?.url) {
      return res.status(404).json({ message: 'File not found.' });
    }

    const { data, error } = await supabase.storage
      .from('upload')
      .createSignedUrl(file.path, 60); // 60 seconds

    if (error || !data?.signedUrl) {
      return res.status(404).json({ message: 'File not found.' });
    }

    return res.redirect(data.signedUrl);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
