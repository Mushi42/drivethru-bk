const mongoose = require("mongoose");

/*

name
city
facutly
department
eligibility
date
test
years_of_graduation

*/ 


const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    fee: {
        type: Object,
    },
    department: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    facutly: {
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
