const mongoose = require("mongoose");


const collectionSchema = new mongoose.Schema({
   country: String,
   application_form: String,
   cost_of_study: String,
   cost_of_living: String,
   pakistan_visa: String,
   job_oppertunity: String,
   study_visa_requirement: String,
   level_of_education: String,
   courses: String,
   student_life: String,
   study_in_scholarship: String,
}, { timestamps: true });


module.exports = mongoose.model("InternalNationalUniversity", collectionSchema);;
