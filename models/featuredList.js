const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featureListSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    link:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

var FeaturedList = mongoose.model('FeaturedList',featureListSchema,'featuredList' );

module.exports= FeaturedList;