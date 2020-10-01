const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    address:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    pincode:{
        type:String,
        required:true
    }
})

const orderSchema = new Schema({
    product_id:{
        type: String,
        required: true
    },
    title:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        required: true
    }
})

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
    },
    my_address:[addressSchema],
    orders:[orderSchema]
}, {
    timestamps:true
})

var Users = mongoose.model('Users',userSchema,'userList');
module.exports= Users;