const { UploadService } = require('../services');
const { setResponse } = require('../helpers');

const UploadController = {};

UploadController.uploadNationalExcelSheet = async (req, res) => {
    try {
        const data = await UploadService.uploadNationalExcelSheet(req);
        setResponse(res, data)
    } catch (error) {
        console.log('Error ', error);
        setResponse(res, { type: 'serverError', data: error })
    }
};

UploadController.uploadImageToS3 = async (req, res) => {
    try {
        const data = await UploadService.uploadImage(req);
        setResponse(res, data)
    } catch (error) {
        console.log('Error ', error);
        setResponse(res, { type: 'serverError', data: error })
    }
}


module.exports = UploadController;
