const express = require('express');

const { uploadController } = require('../controller');
const { protectRoutes, adminOnly } = require('../middleware');

const router = express.Router();

/* Protect All Below Routes */
// router.use(protectRoutes);
router.post('/university/national/sheet', uploadController.uploadNationalExcelSheet);
router.post('/image', uploadController.uploadImageToS3);


module.exports = router;