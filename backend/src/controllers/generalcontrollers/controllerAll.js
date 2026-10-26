import prisma from '../../lib/prisma.js';

//view folders at the root
export const viewItemsAtRootController = async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
        parentId: null,
      },
    });

    const files = await prisma.file.findMany({
      where: {
        userId: req.user.id,
        folderId: null,
      },
    });

    res.status(200).json({
      folders: folders,
      files: files,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};
