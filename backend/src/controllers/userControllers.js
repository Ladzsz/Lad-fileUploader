import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';

//ccreate user
export const createUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: passwordHash,
      },
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//edit user
export const updateUserController = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        username: username,
      },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//delete user
export const deleteUserController = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.user.id },
    });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
