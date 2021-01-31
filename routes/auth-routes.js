const passport = require('passport');

module.exports = app => {
  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Send request to authenticate with google.
  // Upon successfully authenticating, google will provide a code
  // back to the application
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile'],
    })
  );

  // passport.authenticate('google') exchanges code received from initial call
  // to passport.authenticate('google') for information about the user.
  // Callback function inside Google Strategy will fire before the callback of
  // route handler below.
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );

  app.get(
    '/auth/github',
    passport.authenticate('github', {
      scope: ['profile'],
    })
  );

  app.get(
    '/auth/github/callback',
    passport.authenticate('github'),
    (req, res) => {
      res.redirect('/dashboard');
    }
  );
};
