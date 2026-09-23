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

    const { data, error } = await supabase.storage
      .from('upload')
      .upload(fileName, file.buffer, {
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
        name: file.originalname,
        url: fileUrl,
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
