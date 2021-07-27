const _ = require("lodash");

const { } = require("../models");
const mongoose = require('mongoose');
const { uploadHelper } = require("../helpers");
const { uploadFile } = require("../helpers/upload.helper");
const fs = require('fs');
const { isArray } = require("lodash");


const UploadService = {}


UploadService.uploadImage = async (req) => {

    try {

        if (!req.files || Object.keys(req.files).length === 0) {
            return { type: "bad", message: `No files were uploaded.`, };
        }

        const { file } = req.files;
        console.log(file)
        if (isArray(file)) {
            let respLinks = []
            for (fi of file) {
                const uploadedFile = await uploadHelper.uploadFileS3(fi, 20, 'sheets');
                respLinks.push(uploadedFile.data)
            }
            return { type: "success", message: 'Access Paths', data: respLinks }

        } else {
            const uploadedFile = await uploadHelper.uploadFileS3(file, 20, 'sheets');

            if (!uploadedFile.status) {
                return { type: "bad", message: uploadedFile.message, };
            }

            return { type: "success", message: 'Access Path', data: uploadedFile.data }
        }

    } catch (error) {
        throw error;
    }

    // console.log(req.files.file.name)

}

UploadService.uploadNationalExcelSheet = async (req) => {
    try {

        if (!req.files || Object.keys(req.files).length === 0 || !req.files.sheet) {
            return { type: "bad", message: `No files were uploaded.`, };
        }

        const { sheet } = req.files;

        const uploadedFile = await uploadHelper.uploadFile(sheet, 20, 'xlsx', '/sheets');

        if (!uploadedFile.status) {
            return { type: "bad", message: uploadedFile.message, };
        }

        const fileData = await uploadHelper.excelFile('public' + uploadedFile.data.filePathWithFileName);

        return { type: "success", message: 'File Data', data: fileData }

    } catch (error) {
        throw error;
    }
};

module.exports = UploadService;
