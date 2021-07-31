const mongoose = require("mongoose");


const collectionSchema = new mongoose.Schema({
   countryName: { type: String, trim: true },
   costOfStudy: { type: String, trim: true },
   costOfLiving: { type: String, trim: true },
   visaForPakistaniStudents: { type: String, trim: true },
   jobWorkOpportunitiesForStudents: { type: String, trim: true },
   admissionDetails: { type: String, trim: true },
   levelsOfEducation: { type: String, trim: true },
   mostPopularCoursesForInternationalStudents: { type: String, trim: true },
   studentLife: { type: String, trim: true },
   studyInScholarships: { type: String, trim: true },
}, { timestamps: true });


module.exports = mongoose.model("internationalUni", collectionSchema);