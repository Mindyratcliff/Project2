const db = require('../models');
const requireLogin = require('./../middleware/requireLogin');

module.exports = app => {
    // fetch the drawings
    app.get('/api/drawings', requireLogin, async (req, res) => {
        try {
            const drawings = await db.Drawing.findAll({
                where: { UserId: req.user.dataValues.id },
                include: [db.User],
            });
            res.json(drawings);
        } catch (e) {
            res.json(e);
        }
    });

    app.get('/api/drawings/:id', requireLogin, async (req, res) => {
        try {
            const drawing = await db.Drawing.findOne({
                where: { id: req.params.id },
            });
            res.json(drawing);
        } catch (e) {
            res.json(e);
        }
    });

    // create drawings
    app.post('/api/drawings', requireLogin, async (req, res) => {
        try {
            const newDrawing = await db.Drawing.create({
                UserId: req.user.dataValues.id,
                title: req.body.title,
                body: req.body.body,
            });
            res.json(newDrawing);
        } catch (e) {
            res.json(e);
        }
    });

    // updates a drawing
    app.put('/api/drawings/:id', requireLogin, async (req, res) => {
        try {
            const drawing = await db.Drawing.update(req.body, {
                where: {
                    id: req.params.id,
                },
            });
            res.json(drawing);
        } catch (e) {
            res.json(e);
        }
    });

    //delete a drawing
    app.delete('/api/drawings/:id', requireLogin, (req, res) => {
        const drawing = db.Drawing.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json(drawing);
    });
};
