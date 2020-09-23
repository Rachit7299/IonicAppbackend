const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartSchema = new Schema({
        user_id:{
        type: String,
        required: true
    },
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
    stock:{
        type: Boolean,
        required: true
    },
    count:{
        type: Number,
        required: false,
        default: 1
    },

},{
    timestamps:true
})

var cartList = mongoose.model('CartList',cartSchema,'cartList' );

module.exports= cartList;