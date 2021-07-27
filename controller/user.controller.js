const { userService } = require('../services');
const { setResponse } = require('../helpers');

const UserController = {};

UserController.signUp = async (req, res) => {
    try {
        const data = await userService.signUp(req);
        data.password = undefined;
        setResponse(res, data)
    } catch (error) {
        console.log('Error ', error);
        setResponse(res, { type: 'serverError', data: error })
    }
};

UserController.signIn = async (req, res) => {
    try {
        const data = await userService.signIn(req);
        setResponse(res, data)
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
}

UserController.getLoginUser = async (req, res) => {
    try {
        const data = await userService.getLoginUser(req);
        setResponse(res, data)
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
}

UserController.completeProfile = async (req, res) => {
    try {
        const data = await userService.completeProfile(req);
        setResponse(res, data)
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
}


UserController.findAll = async (req, res) => {
    try {
        const data = await userService.findAll(req);
        setResponse(res, data);
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
};

UserController.findOne = async (req, res) => {
    try { // userId
        const data = await userService.findOne(req);
        setResponse(res, data);
    } catch (error) {
        console.log('findOne', error)
        setResponse(res, { type: 'serverError', data: error })
    }
}
UserController.update = async (req, res) => {
    try { // userId

        const data = await userService.update(req);
        setResponse(res, data);
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
}
UserController.purge = async (req, res) => {
    try { // userId

        const data = await userService.purge(req);
        setResponse(res, data);
    } catch (error) {
        setResponse(res, { type: 'serverError', data: error })
    }
}



module.exports = UserController;
