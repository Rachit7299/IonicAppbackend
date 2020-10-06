var express = require('express');
var bodyParser = require('body-parser');
var Trainee = require('../models/trainee');
const traineeRouter =express.Router();
traineeRouter.use(bodyParser.json());
var bcrypt = require('bcrypt');
const config = require('../config');
const jwt= require('jsonwebtoken');

traineeRouter.route("/register").post((req, res, next) => {
    password= req.body.password;
    bcrypt.hash(password, 10, (err, hash) => {
      Trainee
      .create({
        name: req.body.name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        student_no: req.body.student_no,
        branch: req.body.branch,
        password: hash,
      }).then((user) => {
        res.status(200).json({ status: "Registration Successful!"});
      }).catch((err) => {
        if (err.code === 11000)
          res.status(409).json({ status: "Duplicate Entry Found" });
        else res.status(500).json({ status: "Internal Server" });
      });
    },(err)=>next(err))  
  });

traineeRouter.route('/login')
.post((req,res,next)=>{
    Trainee.findOne({student_no:req.body.student_no})
    .then((student)=>{
        if(!student){
            res.status(401).end('Student Not Found');
          }
        else{
            bcrypt.compare(req.body.password,student.password,(err,result)=>{
                if(result == true){
                    let token= jwt.sign({id:student._id},config.secretKey,{expiresIn:'1h'});
                    res.status(200).json({"Login":"True","token":token});
                  }
                  else{
                    res.status(403).send('Incorrect Password');
                  }
            })
        }
    },((err)=>next(err))
    ).catch((err)=>next(err));
});

module.exports=traineeRouter;