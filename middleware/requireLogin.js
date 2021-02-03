module.exports = (req, res, next) => {
    // if the user is not logged in, they will be redirected to the homepage
    if (!req.user) {
        return res.redirect('/');
    }
    // if the user is logged in, perform the callback
    next();
};
