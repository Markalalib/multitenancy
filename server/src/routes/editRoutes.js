const editBindMasterController = require("../controller/editController");
const express = require("express");
const router = express.Router();

router.get("/edit/:tableName/:id",editBindMasterController.editBindMasterGrid);

module.exports = router;