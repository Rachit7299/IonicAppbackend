const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const traineeSchema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    phone_no:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

var Trainees = mongoose.model('Trainees', traineeSchema, 'traineeList');
module.exports = Trainees;