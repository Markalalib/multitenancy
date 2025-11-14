// server/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Create or update (single endpoint; SP handles insert vs update)
router.post('/createOrUpdate', userController.createOrUpdateUser);

// Get list (optional tenant filter via query ?Tenant_ID=)
router.get('/list', userController.getAllUsers);

// Get single user by id
router.get('/:id', userController.getUserById);

// Soft delete
router.delete('/:id', userController.deleteUser);

module.exports = router;
