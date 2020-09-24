var express = require('express');
var bodyParser = require('body-parser');
const Products = require('../models/product')
const productRouter = express.Router();
productRouter.use(bodyParser.json());
const authenticate = require('../authenticate');
const Cart = require('../models/cart')

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

productRouter.route('/viewcart/:userId')
.get((req,res,next)=>{
    Cart.find({user_id:req.params.userId})
    .then((prdts)=>{
        if(prdts.length){
            let i=0;
            let cost=0;
            while(i<prdts.length){
                cost=cost+prdts[i].price;
                i=i+1;
            }
            res.status(200).json({items: prdts,total:cost});
        }
        else
        res.status(204).json({"status":"No Products"})
    },(err)=>next(err))
    .catch((err)=>next(err));
});

productRouter.route('/addcart/:userId&:prdtId')
.post((req,res,next)=>{
    Products.findOne({_id:req.params.prdtId})
    .then((product)=>{
        if(product.stock){
            Cart.create({
                user_id: req.params.userId,
                product_id: req.params.prdtId,  
                title: product.title,
                image: product.image,
                price:product.price,
                stock: product.stock,                
            }).then((response)=>{
                res.status(200).end('Added to Cart');
            }).catch((err)=>next(err));
        }
        else{
            res.status(200).end('Out of Stock');
        }
    },((err)=>next(err))
    ).catch((err)=> next(err))
});

productRouter.route("/delcart/:Id")
.delete((req,res,next)=>{
    Cart.deleteOne({_id: req.params.Id})
    .then((result)=>{
        res.status(200).end('Delted Successfully')
    },((err)=>next(err))
    ).catch((err)=>next(err));
});

productRouter.route("/del-all-cart/:Id")
.delete((req,res,next)=>{
    Cart.deleteMany({user_id: req.params.Id})
    .then((result)=>{
        res.status(200).end('Cart Empty');
    },((err)=>next(err))
    ).catch((err)=>next(err));
});

module.exports = productRouter;