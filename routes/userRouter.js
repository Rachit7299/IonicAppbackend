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

userRouter.route("/signup").post((req, res, next) => {
  users
    .create({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      city: req.body.city,
      pswd: req.body.pswd,
    })
    .then((user) => {
      res.status(200).json({ status: "Registration Successful!", user: user });
    })
    .catch((err) => {
      if (err.code === 11000)
        res.status(409).json({ status: "Duplicate Entry Found" });
      else res.status(500).json({ status: "Internal Server" });
    });
});

module.exports=userRouter;