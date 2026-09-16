import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import prisma from '../src/lib/prisma.js';

//auth middleware
export const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Not authenticated' });
};

export default (passport) => {
  passport.use(
    new LocalStrategy(
      //setting username to email so it grabs user by email instead of username
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email: email },
          });

          if (!user) {
            return done(null, false, {
              message: 'Incorrect email or password.',
            });
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return done(null, false, {
              message: 'Incorrect email or password.',
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
