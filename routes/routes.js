const express = require('express');
const router = express.Router();
const drawing = require('../models/drawing');

router.post('api/drawings', (req, res) => {
    drawing.create({
        author: req.body.title,
        body: req.body.body,
        created_at: req.body.created_at
    }).then(data => {
        res.json(data);
        res.end();
    });

});

router.get('api/drawings', (req, res) => {
    drawing.findAll({}).then(data => {
        res.json(data);
    });
});

router.update('api/drawings/:id', (req, res) => {

});

router.delete('api/drawings/:id', (req, res) => {

});

module.exports = router;