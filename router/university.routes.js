const express = require('express');

const { nationalUniversityController } = require('../controller');
const { protectRoutes, adminOnly } = require('../middleware');

const router = express.Router();

/* Protect All Below Routes */

/*
    @route: /api/v1/university/national
    @Des: Create National University 
 */
router.post('/national', nationalUniversityController.create);
router.get('/national/:id', nationalUniversityController.findOne);
router.get('/national', nationalUniversityController.findOne);
router.put('/national/:id', nationalUniversityController.create);
router.delete('/national/:id', nationalUniversityController.create);


module.exports = router;