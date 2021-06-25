const express = require('express');

const { ticketsController } = require('../controller');
const { protectRoutes, adminOnly } = require('../middleware');

const router = express.Router();

/* Protect All Below Routes */
router.use(protectRoutes);
router.post('/', ticketsController.create);
router.get('/loginUserTickets', ticketsController.loginUserTickets);
router.get('/', adminOnly, ticketsController.findAll);
router.post('/ticketAssignedTo/:ticketId', adminOnly, ticketsController.ticketAssignedTo);
router.get('/:ticketId', ticketsController.findOne);

router.post('/ticketRepond/:ticketId', ticketsController.ticketRepond);
router.put('/:ticketId', ticketsController.update);
router.delete('/:ticketId', ticketsController.purge);


module.exports = router;