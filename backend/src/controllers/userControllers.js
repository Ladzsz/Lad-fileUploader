import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import { generateResetToken, sendResetEmail } from '../utils/mailservice.js';
import crypto from 'crypto';

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

//send reset password controller
export const sendresetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const { token, hashedToken, expires } = generateResetToken();

    await prisma.user.update({
      where: { email: email },
      data: {
        hashedToken: hashedToken,
        tokenExpires: expires,
      },
    });

    await sendResetEmail(email, token);

    res.json({
      message: 'If email exists reset email sent',
    });
  } catch (err) {
    console.error(err);

    res.json({
      message: 'If email exists reset email sent',
    });
  }
};

//confirm password reset controller
export const confirmResetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const token = req.params.token;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findUnique({
      where: {
        hashedToken: hashedToken,
      },
    });

     if (!user) {
      return res.status(400).json({
        message: "Invalid reset token",
      });
    }

    if (new Date(user.tokenExpires) < new Date()) {
      return res.status(400).json({
        message: "Reset token expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        hashedToken: null,
        tokenExpires: null,
      },
    });

    res.json({
      message: "Password reset successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reset password" });
  }
};