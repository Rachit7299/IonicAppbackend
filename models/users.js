const mongoose = require('mongoose');
const { use } = require('../routes/homeRouter');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    mobile:{
        type: Number,
        required: true,
        unique: true
    },
    city:{
        type: String,
        required: true
    },
    pswd:{
        type: String,
        required: true
    }
}, {
    timestamps:true
})

var Users = mongoose.model('Users',userSchema,'userList');
module.exports= Users;