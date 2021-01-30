const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
// IMPORT USER MODEL: const db = require("../models")
const keys = require("../../config/keys");

passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookClientID,
			clientSecret: keys.facebookClientSecret,
			callbackURL: "/auth/facebook/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			const id = profile.id;
			const username = profile.displayName;

			const user = await User.findOrCreate({
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
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => done(null, user));
});
