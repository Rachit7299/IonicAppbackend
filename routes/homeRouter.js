var express = require('express');
var bodyParser = require('body-parser');
const Category = require('../models/catgoryList');
const homeRouter = express.Router();
const FeaturedList = require('../models/featuredList');
homeRouter.use(bodyParser.json());

homeRouter.route('/')
.all((req,res,next)=>{
    res.statusCode =403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Incomplete Url !');
})

homeRouter.route('/categories')
.get((req,res,next)=>{
    Category.find({})
    .then((category)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(category)
    },(err)=> next(err))
    .catch((err)=>next(err));
});

homeRouter.route('/featured')
.get((req,res,next)=>{
    FeaturedList.find({})
    .then((featuredList)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(featuredList)
    },(err)=> next(err))
    .catch((err)=>next(err));
})

module.exports = homeRouter;