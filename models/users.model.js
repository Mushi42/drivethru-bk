const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    profilePic: {
        type: String
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'category'
    },
    accountType: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Professional'],
        default: 'Beginner'
    },
    coords:
    {
        type: { type: String },
        coordinates: []

    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date
    },
    updatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    }
});

const USERS = mongoose.model('users', usersSchema);
module.exports = USERS;