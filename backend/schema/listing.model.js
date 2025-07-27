const mongoose = require('mongoose');
// const { defaultAllowedOrigins } = require('vite');
const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        maxlength: 150
    },
    description:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,

    },
    image:{
        type:String,
        default:'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    location:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
    },
    country:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
    },
    like:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'signup',
    }],
    
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'comment',
    }],
    rating:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'rating', 
    }],
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'signup',
    }
},{timestamps:true});

const listingModel = mongoose.model('listing',listingSchema);
module.exports = listingModel
