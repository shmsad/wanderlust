const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        lowercase:true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        unique: true,
        // match: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
        // match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone:{
        type: String,
        default: "",
        trim: true,
        // minlength:10,
        maxlength:10
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    term_condition:{
        type: Boolean,
        default: false
    },
    avtar:{
        type: String,
        default:"https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"

    },
    address:{
        type: String,
        default: ""
    },
    country:{
        type:String,
        default:""
    }
},{timestamps:true})

const authModel = mongoose.model("signup",authSchema);
module.exports = authModel;