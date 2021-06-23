const { USER_MODEL } = require('../models');

const create = async ({ body }) => {
    try {
        const reqData = body;
        const user = await USER_MODEL.findOne({ name: reqData.name });
        if (!user) {
            const data = await USER_MODEL.create(reqData);
            return { type: 'success', message: `${data.name.toUpperCase()} is created successfully`, data }
        }
        return { type: 'bad', message: `${reqData.name} USER_MODEL exist!` }

    } catch (error) {
        throw error;
    }
};

const findOne = async ({ params }) => {
    try {
        const data = await USER_MODEL.findOne({ _id: params.userId })
        if (data) return { type: 'success', message: `${data.name.toUpperCase()} found`, data }
        else return { type: 'bad', message: `${data.name.toUpperCase()} USER_MODEL not exist!` }
    } catch (error) {
        throw error;
    }
};

const findAll = async (req) => {
    try {
        const options = req.query;
        let data;
        if (options.name) {
            data = await USER_MODEL.find({});
        } else data = await USER_MODEL.find(options);
        if (data.length) return { type: 'success', message: `User found`, data }
        else return { type: 'bad', message: `User not found` }
    } catch (error) {
        throw error;
    }
};

const update = async ({ params, body }) => {
    try {
        const _id = params.userId;
        const data = await USER_MODEL.findByIdAndUpdate(_id, body, { new: true });
        if (data) return { type: 'success', message: `${data.shopName.toUpperCase()} shop Updated`, data }
        else return { type: 'bad', message: `Shops not found` }

    } catch (error) {
        throw error;
    }
};

const purge = async (req) => {
    try {

    } catch (error) {
        throw error;
    }
};

module.exports = {
    create,
    findOne,
    findAll,
    update,
    purge
}