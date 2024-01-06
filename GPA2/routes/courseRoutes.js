const router = require("express").Router();
const coursesController = require("../controllers/coursesController");
router.get("/", coursesController.index, coursesController.indexView);
module.exports = router;
