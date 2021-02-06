const db = require('../models');
const requireLogin = require('../middleware/requireLogin');

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('landing');
    });

    app.get('/home', (req, res) => {
        res.render('canvas');
    });
    

    app.get('/dashboard', requireLogin, async (req, res) => {
        const drawings = await db.Drawing.findAll({
            where: { UserId: req.user.dataValues.id },
            include: [db.User],
        });
        res.render('dashboard', { drawings });
    });
};
