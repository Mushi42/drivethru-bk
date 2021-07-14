const mongoose = require("mongoose");


const collectionSchema = new mongoose.Schema({
    uni_code: {
        type: String,
    },
    name: {
        type: String,
        trim: true
    },
    department: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    eligibility: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    test: {
        type: String,
        trim: true
    },
    years_of_graduation: {
        type: String,
        trim: true
    },


    /*
        uni_code
        name
        department
        city
        eligibility
        date
        test
        years_of_graduation 
     */

}, { timestamps: true });


module.exports = mongoose.model("NationalUniversity", collectionSchema);;
