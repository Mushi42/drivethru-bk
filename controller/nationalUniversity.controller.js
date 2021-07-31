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
NationalUniversityController.createInternational = async (req, res) => {
    try {
        const data = await NationalUniversityService.createInternational(req);
        setResponse(res, data)
    } catch (error) {
        console.log('Error ', error);
        setResponse(res, { type: 'serverError', data: error })
    }
};

NationalUniversityController.bulkCreate = async (req, res) => {
    try {
        const data = await NationalUniversityService.bulkCreate(req);
        setResponse(res, data)
    } catch (error) {
        console.log('Error ', error);
        setResponse(res, { type: 'serverError', data: error })
    }
};
NationalUniversityController.find_your_uni = async (req, res) => {
    try {
        const data = await NationalUniversityService.find_your_uni(req);
        setResponse(res, data)
    } catch (error) {
        console.log('Error ', error);
        setResponse(res, { type: 'serverError', data: error })
    }
};
NationalUniversityController.internationalBulkCreate = async (req, res) => {
    try {
        const data = await NationalUniversityService.internationalBulkCreate(req);
        setResponse(res, data)
    } catch (error) {
        console.log('Error ', error);
        setResponse(res, { type: 'serverError', data: error })
    }
};


NationalUniversityController.findAllInternational = async (req, res) => {
    try {
        const data = await NationalUniversityService.findAllInternational(req);
        setResponse(res, data);
    } catch (error) {
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

NationalUniversityController.findWithRange = async (req, res) => {
    try {
        const data = await NationalUniversityService.findWithRange(req);
        setResponse(res, data);
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
};

NationalUniversityController.get_uni_dep_city = async (req, res) => {
    try {
        const data = await NationalUniversityService.get_uni_dep_city(req);
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
