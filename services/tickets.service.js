const _ = require("lodash");

const { Ticket } = require("../models");
const mongoose = require('mongoose');
const { userHelper, uplodingHelper } = require("../helpers");

const TicketsService = {}

TicketsService.create = async (req) => {
    try {
        const reqData = req.body;
        reqData.owner = req.user.userId
        const data = new Ticket(reqData);
        await data.save();
        return { type: "success", message: `Ticket created`, data };
    } catch (error) {
        throw error;
    }
};

TicketsService.loginUserTickets = async (req) => {
    try {
        const filter = { owner: req.user.userId }
        const data = await Ticket.find(filter);
        return { type: "success", message: `Ticket List`, data };
    } catch (error) {
        throw error;
    }
};

TicketsService.ticketAssignedTo = async (req) => {
    try {
        if (!req.body.staffId) return { type: "success", message: `Please provide staff Id!`, data };
        const filter = { assigned_to: req.body.staffId, ticket_status: 'active' }
        const data = await Ticket.findByIdAndUpdate(req.params.ticketId, filter, { new: true });
        if (data) {
            return { type: "success", message: `Ticket Assigned`, data };
        } else return { type: "bad", message: `Ticket not Assigned`, data };

    } catch (error) {
        throw error;
    }
};

TicketsService.findOne = async (req) => {
    try {
        const { params } = req;
        const data = await Ticket.findById(params.ticketId);
        if (data) {
            return { type: "success", message: "user found!", data };
        } else {
            return { type: "bad", message: "user not found!", data };
        }
    } catch (error) {
        throw error;
    }
};

TicketsService.findAll = async ({ body, query }) => {
    try {
        const options = query;
        const data = await Ticket.find(options);
        if (data.length > 0) {
            return { type: "success", message: "Record found!", data };
        } else {
            return { type: "bad", message: "Record not found!" };
        }
    } catch (error) {
        throw error;
    }
};

TicketsService.ticketRepond = async ({ params, body }) => {
    try {
        const _id = params.ticketId;
        const updatedData = { response: body.response, ticket_status: 'completed' }
        const data = await Ticket.findByIdAndUpdate(_id, updatedData, { new: true });
        if (data)
            return {
                type: "success",
                message: `Ticket Updated`,
                data,
            };
        else return { type: "bad", message: `Ticket not found` };
    } catch (error) {
        console.log(error);
        throw error;
    }
};
TicketsService.update = async ({ params, body }) => {
    try {
        const _id = params.ticketId;

        const data = await Ticket.findByIdAndUpdate(_id, body, { new: true });
        if (data)
            return {
                type: "success",
                message: `Ticket Updated`,
                data,
            };
        else return { type: "bad", message: `Ticket not found` };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

TicketsService.purge = async ({ params }) => {
    try {
        const _id = params.ticketId;
        const data = await Ticket.findByIdAndDelete(_id);
        if (data) {
            return {
                type: "success",
                message: `Ticket Deleted`,
                data
            };
        } else return { type: "bad", message: `Ticket not found` };
    } catch (error) {
        throw error;
    }
};


module.exports = TicketsService;
