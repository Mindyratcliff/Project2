const db = require("../models");

module.exports = app => {
	// check users id and find all drawings that are associated
	app.get("/dashboard", async (req, res) => {
		console.log(req.user);
		const drawings = await db.Drawing.findAll({
			where: { UserId: req.user.dataValues.id },
			include: [db.User],
		});
		// **STILL TO DO** send drawings to html page
		console.log(drawings);
		res.send(req.user);
	});

	// when drawing is clicked on populate to canvas
	app.get("/dashboard/:id", async (req, res) => {

	});
};
