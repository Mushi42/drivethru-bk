const _ = require("lodash");

const { NationalUniversity } = require("../models");
const { } = require("../helpers");

const NationalUniversityService = {}

NationalUniversityService.create = async (req) => {
    try {
        const reqData = req.body;
        const data = new NationalUniversity(reqData);
        await data.save();
        return { type: "success", message: `National University created`, data };
    } catch (error) {
        throw error;
    }
};

NationalUniversityService.bulkCreate = async (req) => {
    try {
        const { universities } = req.body;

        if(!universities ||!Array.isArray(universities) || !universities.length) {
            return { type: "bad", message: `Please provide valid data` };
        }

        const createdUniversities = await  NationalUniversity.insertMany(universities)

        return { type: "success", message: `National University created`, data: createdUniversities };
    } catch (error) {
        throw error;
    }
};

NationalUniversityService.findOne = async (req) => {
    try {
        const { params } = req;
        const data = await NationalUniversity.findById(params.id);
        if (data) {
            return { type: "success", message: "National University found!", data };
        } else {
            return { type: "bad", message: "National University not found!", data };
        }
    } catch (error) {
        throw error;
    }
};

NationalUniversityService.findAll = async ({ body, query }) => {
    try {
        const options = query;
        const data = await NationalUniversity.find(options);
        if (data.length > 0) {
            return { type: "success", message: "Record found!", data };
        } else {
            return { type: "bad", message: "Record not found!" };
        }
    } catch (error) {
        throw error;
    }
};
NationalUniversityService.get_uni_dep_city = async ({ body, query }) => {
    try {
        const options = query;
        const data = {};
        data.cities = await NationalUniversity.distinct('city')
        data.universities = await NationalUniversity.distinct('name')
        data.departments = await NationalUniversity.distinct('department')
        if (data) {
            return { type: "success", message: "Record found!", data };
        } else {
            return { type: "bad", message: "Record not found!" };
        }
    } catch (error) {
        throw error;
    }
};

NationalUniversityService.update = async ({ params, body }) => {
    try {
        const _id = params.id;

        const data = await NationalUniversity.findByIdAndUpdate(_id, body, { new: true });
        if (data)
            return {
                type: "success",
                message: `NationalUniversity Updated`,
                data,
            };
        else return { type: "bad", message: `NationalUniversity not found` };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

NationalUniversityService.purge = async ({ params }) => {
    try {
        const _id = params.id;
        const data = await NationalUniversity.findByIdAndDelete(_id);
        if (data) {
            return {
                type: "success",
                message: `National University Deleted`,
                data
            };
        } else return { type: "bad", message: `National University not found` };
    } catch (error) {
        throw error;
    }
};


module.exports = NationalUniversityService;