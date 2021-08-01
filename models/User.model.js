const mongoose = require("mongoose");
const crypto = require('crypto');





const PersonalInformation = mongoose.Schema({

  name: String,
  fatherName: String,
  motherName: String,
  cnic: String,
  dob: String,
  gender: String,
  religion: String,
  bloodGroup: String,
  passportNumber: String,
  maritalStatus: String,
  nameOfNextOfKin: String,
  nextOfKinRelation: String,
  documents: [],

}, { _id: false });

const GuardianInformation = mongoose.Schema({
  guardianName: String,
  guardianRelation: String,
  guardianMonIncome: String,
  guardianCellNo: String,
  guardianOccupation: String,
  guardianCNIC: String,
  guardianNTN: String,
  documents: [],
}, { _id: false });

const ContactInformation = mongoose.Schema({
  applicantCellNo: String,
  alternativeCellNo: String,
  landlineNumber: String,
  cityofResident: String,
  domicile: String,
  nationality: String,
  postalAddress: String,
  permanentAddress: String,
  permanentDistrict: String,
  permanentTehsil: String,
  domicileDistrict: String,
  documents: [],

}, { _id: false });

const AcademicInformation = mongoose.Schema({
  metricLevel: {
    examPassed: String,
    school: String,
    board: String,
    yearOfPassing: String,
    serialNo: String,
    referenceNo: String,
    marksObtained: String,
    totalMarks: String, 
    documents: [],


  },
  interLevel: {
    school: String,
    board: String,
    yearOfPassing: String,
    rollNo: String,
    registrationNo: String,
    marksObtained: String,
    totalMarks: String,
    documents: [],

  },
}, { _id: false });


const userSchema = new mongoose.Schema({

  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,

  },
  studentId: Number,
  contact: {
    type: String,
    trim: true,
    require: true,
  },

  profileImage: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png",
  },

  role: {
    type: String,
    default: "student",
  },
  nationalProfile: {
    completionRate: { type: Number },
    personalInformation: PersonalInformation,
    guardianInformation: GuardianInformation,
    contactInformation: ContactInformation,
    academicInformation: AcademicInformation
  },
  interNationalProfile: {
    completionRate: { type: Number },
    personalInformation: PersonalInformation,
  },
  googleAuth : {
   googleId: String,

  },
  faceBookAuth : {
    fbId: Number
  },
  password: {
    type: String,
    select: false,
  }
}, { timestamps: true });




const User = mongoose.model("users", userSchema);
module.exports = User;
