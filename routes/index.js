const express = require("express");
const router = express.Router();
const homeControllerApi = require("../controllers/home_controller");
const idController = require("../controllers/id_contoller");
const morgan = require("morgan");

router.post("/", morgan("combined"), homeControllerApi.home);
router.use("/:id", morgan("combined"), idController.id);

module.exports = router;
