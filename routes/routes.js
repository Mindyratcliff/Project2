const db = require('../models');
const express = require('express');

const router = express.Router();

// user authentication route
router.get('/dashboard', async (req, res) => {
    console.log(req.user);
    const drawings = await db.Drawing.findAll({
        where: { UserId: req.user.dataValues.id },
        include: [db.User],
    });
    console.log(drawings);
    res.send(req.user);
});

// get drawings route
router.post('api/drawings', (req, res) => {
    drawing.create({
        author: req.body.title,
        body: req.body.body,
        createdAt: req.body.created_at
    }).then(data => {
        res.json(data);
        res.end();
    });

});

// finds all drawings
router.get('api/drawings', (req, res) => {
    drawing.findAll({}).then(data => {
        res.json(data);
    });
});

// updates a drawing
router.put('api/drawings/:id', (req, res) => {
    drawings.update(req.body, {
        where: {
            id: req.body.id,
        },
    }).then(thisDrawing => res.json(thisDrawing));
});

router.delete('api/drawings/:id', (req, res) => {
    drawings.destroy({
        where: {
            id: req.params.id,
        }
    }).then(thisDrawing => res.json(thisDrawing));
});

module.exports = router;
