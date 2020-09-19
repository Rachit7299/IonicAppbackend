var express = require('express');
var bodyParser = require('body-parser');
var users = require('../models/users');
const userRouter = express.Router();
userRouter.use(bodyParser.json());
var bcrypt = require('bcrypt');
const config = require('../config');

const jwt= require('jsonwebtoken');


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

userRouter.route("/signup").post((req, res, next) => {
  password= req.body.pswd;
  bcrypt.hash(password, 10, (err, hash) => {
    users
    .create({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      city: req.body.city,
      pswd: hash,
    }).then((user) => {
      res.status(200).json({ status: "Registration Successful!"});
    }).catch((err) => {
      if (err.code === 11000)
        res.status(409).json({ status: "Duplicate Entry Found" });
      else res.status(500).json({ status: "Internal Server" });
    });
  },(err)=>next(err)) 

});

userRouter.route("/login").post((req,res,next)=>{
  users.findOne({mobile: req.body.username})
  .then((user)=>{
    if(!user){
      res.status(401).end('User Not Found')
    }
    else{
      bcrypt.compare(req.body.pswd,user.pswd,(err, result)=>{
        if(result == true){
          let token= jwt.sign({id:user._id},config.secretKey,{expiresIn:'24h'});
          res.status(200).json({"Login":"True","token":token});
        }
        else{
          res.status(403).send('Incorrect Password');
        }
      })
    }
  },((err)=>next(err))
  ).catch((err)=>next(err));
})

module.exports=userRouter;