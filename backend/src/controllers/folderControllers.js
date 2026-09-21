import prisma from '../lib/prisma.js';

//function to grab folder by its user
const grabFolderByUser = async (req) => {
  const folder = await prisma.folder.findFirst({
    where: {
      id: Number(req.params.id),
      userId: req.user.id,
    },
  });

  return folder;
};

//create folder
export const createfolderController = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const user = req.user.id;

    if (!name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!user) {
      return res.status(400).json({ error: 'folder must have user' });
    }

    const newFolder = await prisma.folder.create({
      data: {
        name,

        parent: parentId
          ? {
              connect: {
                id: Number(parentId),
              },
            }
          : null,

        user: {
          connect: {
            id: user,
          },
        },
      },
    });

    res.status(201).json(newFolder);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//update folder
export const updatefolderController = async (req, res) => {
  try {
    const { name } = req.body;

    const folder = await grabFolderByUser(req);

    if (!folder) {
      return res.status(404).json({
        error: 'Folder not found',
      });
    }

    const updatedfolder = await prisma.folder.update({
      where: {
        id: folder.id,
      },
      data: {
        name,
      },
    });

    res.status(201).json(updatedfolder);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//delete folder
export const deletefoldercontroller = async (req, res) => {
  try {
    const folder = await grabFolderByUser(req);

    if (!folder) {
      return res.status(404).json({
        error: 'Folder not found',
      });
    }

    prisma.folder.delete({
      where: {
        id: folder.id,
      },
    });

    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//view folder folder
export const viewfolderController = async (req, res) => {
  try {
    const folder = await grabFolderByUser(req);

    if (!folder) {
      return res.status(404).json({
        error: 'Folder not found',
      });
    }
    res.status(201).json(folder);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//view folders at the root
export const viewfolderTreeController = async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: req.user.id,
        parentId: null,
      },
    });

    res.status(200).json(folders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

//move folder
export const movefolderController = async (req, res) => {
  try {
    const folder = await grabFolderByUser(req);

    if (!folder) {
      return res.status(404).json({
        error: 'Folder not found',
      });
    }

    const { newParentId } = req.body;

    if (newParentId !== null) {
      const newParent = await prisma.folder.findFirst({
        where: {
          id: Number(newParentId),
          userId: req.user.id,
        },
      });

      if (!newParent) {
        return res.status(404).json({
          error: 'New parent folder not found',
        });
      }
    }

    const updatedFolderPosition = await prisma.folder.update({
      where: {
        id: folder.id,
      },
      data: {
        parentId: newParentId === null ? null : Number(newParentId),
      },
    });

    res.status(200).json({
      message: 'Folder moved',
      folder: updatedFolderPosition,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};
