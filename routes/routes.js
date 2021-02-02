const db = require('../models');

module.exports = app => {
    app.get('/dashboard', async (req, res) => {
        console.log(req.user);
        const drawings = await db.Drawing.findAll({
            where: { UserId: req.user.dataValues.id },
            include: [db.User],
        });
        console.log(drawings);
        res.send(req.user);
    });

    // user authentication route
    app.get('/dashboard', async (req, res) => {
        console.log(req.user);
        const drawings = await db.Drawing.findAll({
            where: { UserId: req.user.dataValues.id },
            include: [db.User],
        });
        console.log(drawings);
        res.send(req.user);
    });

    // get drawings route
    app.post('api/drawings', async (req, res) => {
        const newDrawing = await db.Drawing.create({
            author: req.body.title,
            body: req.body.body,
            createdAt: req.body.created_at
        });
        res.json(newDrawing);
        res.end();
    });

    // updates a drawing
    app.put('api/drawings/:id', (req, res) => {
        db.Drawing.update(req.body, {
            where: {
                id: req.body.id,
            },
        }).then(data => res.json(data));
    });

    //delete a drawing
    app.delete('api/drawings/:id', (req, res) => {
        db.Drawings.destroy({
            where: {
                id: req.params.id,
            }
        }).then(data => res.json(data));
    });
};
