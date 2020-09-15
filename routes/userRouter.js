var express = require('express');
var bodyParser = require('body-parser');
var users = require('../models/users');
const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
.get((req,res,next)=>{
    users.find({})
    .then((user)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user)
    },(err)=> next(err))
    .catch((err)=>next(err));
});

userRouter.route('/signup')
.post((req,res,next)=>{
    users.findOne({mobile: req.body.mobile})
    .then((user)=>{
        if(user!=null){
            var err = new Error('User ' + req.body.name + ' already exists!');
            err.status = 403;
            return next(err);
        }
        else{
            return users.create({
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,
                city:req.body.city,
                pswd:req.body.pswd,
            })
        }
    }).then((user)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Registration Successful!', user: user});
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports=userRouter;