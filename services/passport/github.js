const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const db = require('../../models');
const keys = require('../../config/keys');

passport.use(
  new GitHubStrategy(
    {
      clientID: keys.githubClientID,
      clientSecret: keys.githubClientSecret,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const id = profile.id;
      const username = profile.username;

      const user = await db.User.findOrCreate({
        where: { id },
        defaults: {
          username,
        },
      });

      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user[0].dataValues.id);
});

passport.deserializeUser((id, done) => {
  db.User.findByPk(id).then(user => done(null, user));
});
