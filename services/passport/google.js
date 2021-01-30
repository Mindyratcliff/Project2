const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// IMPORT USER MODEL: const db = require("../models")
const keys = require("../../config/keys");

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
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
