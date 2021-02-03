const db = require('../models');
const requireLogin = require('./middleware/requireLogin');

module.exports = app => {
    // fetch the drawings
    app.get('/api/drawings', requireLogin, async (req, res) => {
        const drawings = await db.Drawing.findAll({
            where: { UserId: req.user.dataValues.id },
            include: [db.User],
        });
        res.json(drawings);
    });

    // create drawings
    app.post('/api/drawings', requireLogin, async (req, res) => {
        const newDrawing = await db.Drawing.create({
            UserId: req.user.dataValues.id,
            title: req.body.title,
            body: req.body.body,
        });
        res.json(newDrawing);
    });

    // updates a drawing
    app.put('/api/drawings/:id', requireLogin, async (req, res) => {
        const drawing = await db.Drawing.update(req.body, {
            where: {
                id: req.body.id,
            },
        });
        res.json(drawing);
    });

    //delete a drawing
    app.delete('/api/drawings/:id', requireLogin, (req, res) => {
        const drawing = db.Drawings.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.json(drawing);
    });
};