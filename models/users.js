const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true  
    },
    password:{
        type:String,
        required:true,
            },
    phone:{
        type:Number,
        required:false
    },
    mobilePhone:{
        type:Number,
        required:false   
    },
    street:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    newsletter:{
        type:Boolean,
        default:false
    },
    hidePhone:{
        type:Boolean,
        default:false
    },
    agree:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    }

},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);