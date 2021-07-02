const { NationalUniversityService } = require('../services');
const { setResponse } = require('../helpers');

const NationalUniversityController = {};

NationalUniversityController.create = async (req, res) => {
    try {
        const data = await NationalUniversityService.create(req);
        setResponse(res, data)
    } catch (error) {
        console.log('Error ', error);
        setResponse(res, { type: 'serverError', data: error })
    }
};


NationalUniversityController.findAll = async (req, res) => {
    try {
        const data = await NationalUniversityService.findAll(req);
        setResponse(res, data);
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
};

NationalUniversityController.findOne = async (req, res) => {
    try { // userId
        const data = await NationalUniversityService.findOne(req);
        setResponse(res, data);
    } catch (error) {
        console.log('findOne', error)
        setResponse(res, { type: 'serverError', data: error })
    }
}

NationalUniversityController.update = async (req, res) => {
    try { // userId

        const data = await NationalUniversityService.update(req);
        setResponse(res, data);
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
}
NationalUniversityController.purge = async (req, res) => {
    try { // userId

        const data = await NationalUniversityService.purge(req);
        setResponse(res, data);
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
}



module.exports = NationalUniversityController;
