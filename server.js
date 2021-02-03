const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const exphbs = require('express-handlebars');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;
const keys = require('./config/keys');

// set up express app to use handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Requiring our models for syncing
const db = require('./models');
require('./services/passport/google');
require('./services/passport/github');
require('./services/passport/facebook');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cookieSession({
        keys: [keys.cookieKey],
        maxAge: 1000 * 60 * 60 * 24,
    })
);

// Static directory
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth-routes.js')(app);
require('./routes/api-routes.js')(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
