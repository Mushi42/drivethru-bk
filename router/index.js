const express = require('express');

const usersRoutes = require('./users.routes');
const ticketsRoutes = require('./tickets.routes');
const univeristyRoutes = require('./university.routes');
const uploadRoutes = require('./upload.routes');
const mailRoutes = require('./mail.routes');


const router = express.Router();

router.use('/users', usersRoutes);
router.use('/tickets', ticketsRoutes);
router.use('/university', univeristyRoutes);
router.use('/uploads', uploadRoutes);
router.use('/contactMail', mailRoutes);




module.exports = router;