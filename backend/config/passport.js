module.exports = (passport) => {
  // future strategy configuration will go here
  

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    // prisma client will be used here later

    // For now, just return the ID
    done(null, { id });
  });
};

