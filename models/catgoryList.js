const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: {
        type: String,
        required: true        
    },
    color_gradient: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

var Categories = mongoose.model('Categories', categorySchema ,'categoryList');

module.exports = Categories;