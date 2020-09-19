const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const CarouselSchema= new Schema({
    img:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

var Carousel = mongoose.model('CarouselSchema',CarouselSchema,'carouselList');
module.exports= Carousel;