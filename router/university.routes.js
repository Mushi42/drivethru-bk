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
router.post('/international', nationalUniversityController.createInternational);
router.post('/national/bulk', nationalUniversityController.bulkCreate);
router.post('/international/bulk', nationalUniversityController.internationalBulkCreate);

router.get('/national/get_uni_dep_city', nationalUniversityController.get_uni_dep_city);
router.get('/national', nationalUniversityController.findAll);
router.post('/national/find_your_uni', nationalUniversityController.find_your_uni);
router.get('/findUniOnRange', nationalUniversityController.findWithRange);
router.get('/international', nationalUniversityController.findAllInternational);
router.get('/international/country', nationalUniversityController.get_inuni_country);

router.get('/national/:id', nationalUniversityController.findOne);
router.put('/national/:id', nationalUniversityController.update);
router.delete('/national/:id', nationalUniversityController.purge);

//InternationalRoutes



module.exports = router;