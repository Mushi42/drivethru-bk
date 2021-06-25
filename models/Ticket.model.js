const mongoose = require("mongoose");


const collectionSchema = new mongoose.Schema({
    ticket_title: {
        type: String,
        trim: true
    },
    ticket_status: {
        type: String,
        enum: ['pending', 'active', 'completed'],
        default: 'pending',
        trim: true
    },
    ticket_description: {
        type: String,
        trim: true
    },
    ticket_response: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },

}, { timestamps: true });


module.exports = mongoose.model("tickets", collectionSchema);;
