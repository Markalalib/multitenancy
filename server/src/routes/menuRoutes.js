const menuController = require("../controller/menuController");
const express = require("express");
const router = express.Router();

// GET: Fetch Menu
router.get("/menus", menuController.getMenu);

module.exports = router;
