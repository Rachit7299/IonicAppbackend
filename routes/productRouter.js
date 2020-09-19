var express = require('express');
var bodyParser = require('body-parser');
const Products = require('../models/product')
const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.route('/')
.all((req,res,next)=>{
    res.statusCode =403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Incomplete Url !');
})

productRouter.route('/products-all')
.get((req,res,next)=>{
    Products.find({})
    .then((products)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products)
    },(err)=> next(err))
    .catch((err)=>next(err));
});


module.exports = productRouter;