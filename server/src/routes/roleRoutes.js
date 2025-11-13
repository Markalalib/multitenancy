const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');

router.post('/insertUpdateRole', roleController.insertOrUpdateRole);
router.get('/roleGrid', roleController.getRoleGrid);


module.exports = router;
