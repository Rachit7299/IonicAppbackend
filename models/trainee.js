const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const traineeSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    student_no:{
        type:Number,
        required:true,
        unique:true
    },
    branch:{
        type:String,
        required:true
    },
    mobile_no:{
        type:Number,
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