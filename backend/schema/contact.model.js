const { default: mongoose } = require("mongoose");

// create schema

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    subject:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
},{timestamps:true})
const contactModel = mongoose.model('contact',contactSchema);
module.exports = contactModel;