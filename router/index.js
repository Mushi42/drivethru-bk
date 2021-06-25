const express = require('express');

const usersRoutes = require('./users.routes');
const ticketsRoutes = require('./tickets.routes');


const router = express.Router();

router.use('/users', usersRoutes);
router.use('/tickets', ticketsRoutes);




module.exports = router;