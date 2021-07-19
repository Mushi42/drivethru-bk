const express = require('express');

const { userController } = require('../controller');
const { protectRoutes, adminOnly } = require('../middleware');

const router = express.Router();

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);

/* Protect All Below Routes */
router.use(protectRoutes);
router.get('/', userController.findAll);
router.get('/:userId', userController.findOne);
router.put('/:userId', userController.update);
router.delete('/:userId', adminOnly, userController.purge);


module.exports = router;