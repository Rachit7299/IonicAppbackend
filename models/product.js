const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    author:{
        type:String,
        required: true
    },
    review:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

const productSchema = new Schema({
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
    details:{
        type: String,
        required: true
    },
    stock:{
        type: Boolean,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    reviews:[reviewSchema]
},{
    timestamps:true
})

var ProductList = mongoose.model('ProductList',productSchema,'productList' );

module.exports= ProductList;