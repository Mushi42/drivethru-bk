const _ = require("lodash");

const { Ticket } = require("../models");
const mongoose = require('mongoose');
const { userHelper, uplodingHelper } = require("../helpers");

const UploadService = {}

UploadService.uploadNationalExcelSheet = async (req) => {
    try {
        return { type: "success", message: `Excel Sheet Uploaded`, data:{} };
    } catch (error) {
        throw error;
    }
};

module.exports = UploadService;
