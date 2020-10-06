var express = require('express');
var bodyParser = require('body-parser');
const Category = require('../models/catgoryList');
const Products = require('../models/product')
const homeRouter = express.Router();
homeRouter.use(bodyParser.json());
const Carousel = require('../models/caraousel');

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
    Products.find({}).limit(7)
    .then((featuredList)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(featuredList)
    },(err)=> next(err))
    .catch((err)=>next(err));
})

homeRouter.route('/toppicks')
.get((req,res,next)=>{
    Products.find({}).skip(2).limit(7)
    .then((topPicks)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(topPicks)
    },(err)=>next(err))
    .catch((err)=>next(err));
})

homeRouter.route('/caraousel')
.get((req,res,next)=>{
    Carousel.find({})
    .then((items)=>{
        res.status(200).json(items)
    },(err)=>next(err))
    .catch((err)=>next(err));
})

module.exports = homeRouter;