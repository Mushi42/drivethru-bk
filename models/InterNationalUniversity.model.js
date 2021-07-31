const mongoose = require("mongoose");


const collectionSchema = new mongoose.Schema({
   countryName: String,
   costOfStudy: String,
   costOfLiving: String,
   visaForPakistaniStudents: String,
   jobWorkOpportunitiesForStudents: String,
   admissionDetails: String,
   levelsOfEducation: String,
   mostPopularCoursesForInternationalStudents: String,
   studentLife: String,
   studyInScholarships: String,
}, { timestamps: true });


module.exports = mongoose.model("uni", collectionSchema);