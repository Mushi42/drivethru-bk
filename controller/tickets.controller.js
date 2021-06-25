const { ticketsService } = require('../services');
const { setResponse } = require('../helpers');

const TicketController = {};

TicketController.create = async (req, res) => {
    try {
        const data = await ticketsService.create(req);
        setResponse(res, data)
    } catch (error) {
        console.log('Error ', error);
        setResponse(res, { type: 'serverError', data: error })
    }
};

TicketController.loginUserTickets = async (req, res) => {
    try {
        const data = await ticketsService.loginUserTickets(req);
        setResponse(res, data)
    } catch (error) {
        console.log('Error ', error);
        setResponse(res, { type: 'serverError', data: error })
    }
};

TicketController.ticketAssignedTo = async (req, res) => {
    try {
        const data = await ticketsService.ticketAssignedTo(req);
        setResponse(res, data)
    } catch (error) {
        console.log('Error ', error);
        setResponse(res, { type: 'serverError', data: error })
    }
};

TicketController.createStaff = async (req, res) => {
    try {
        const data = await ticketsService.createStaff(req);
        data.password = undefined;
        setResponse(res, data)
    } catch (error) {
        console.log('Error ', error);
        setResponse(res, { type: 'serverError', data: error })
    }
};

TicketController.signIn = async (req, res) => {
    try {
        const data = await ticketsService.signIn(req);
        setResponse(res, data)
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
}


TicketController.findAll = async (req, res) => {
    try {
        const data = await ticketsService.findAll(req);
        setResponse(res, data);
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
};

TicketController.findOne = async (req, res) => {
    try { // userId
        const data = await ticketsService.findOne(req);
        setResponse(res, data);
    } catch (error) {
        console.log('findOne', error)
        setResponse(res, { type: 'serverError', data: error })
    }
}
TicketController.ticketRepond = async (req, res) => {
    try { // userId

        const data = await ticketsService.ticketRepond(req);
        setResponse(res, data);
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
}
TicketController.update = async (req, res) => {
    try { // userId

        const data = await ticketsService.update(req);
        setResponse(res, data);
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
}
TicketController.purge = async (req, res) => {
    try { // userId

        const data = await ticketsService.purge(req);
        setResponse(res, data);
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
}



module.exports = TicketController;
