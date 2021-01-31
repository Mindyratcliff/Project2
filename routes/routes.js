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
};
