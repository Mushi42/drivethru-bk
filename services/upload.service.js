const _ = require("lodash");

const { } = require("../models");
const mongoose = require('mongoose');
const { uploadHelper } = require("../helpers");
const { uploadFile } = require("../helpers/upload.helper");

const UploadService = {}

UploadService.uploadNationalExcelSheet = async (req) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0 || !req.files.sheet) {
            return { type: "bad", message: `No files were uploaded.`, };
        }

        const { sheet } = req.files;

        const uploadedFile = await uploadHelper.uploadFile(sheet, 20, 'xlsx', '/sheets');

        /* If Any Error uploading file */
        if(!uploadedFile.status) {
            return { type: "bad", message: uploadedFile.message, };
        }

        const fileData = await uploadHelper.excelFile('public'+ uploadedFile.data.filePathWithFileName);
        
        return {type: "success", message: 'File Data', data: fileData}

        return { type: "success",  ...uploadedFile};
    } catch (error) {
        throw error;
    }
};

module.exports = UploadService;
