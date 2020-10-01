var express = require('express');
var bodyParser = require('body-parser');
var users = require('../models/users');
const userRouter = express.Router();
userRouter.use(bodyParser.json());
var bcrypt = require('bcrypt');
const config = require('../config');

const jwt= require('jsonwebtoken');
const Cart = require('../models/cart')


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
          res.status(200).json({"Login":"True","token":token,"_id":user._id});
        }
        else{
          res.status(403).send('Incorrect Password');
        }
      })
    }
  },((err)=>next(err))
  ).catch((err)=>next(err));
});

userRouter.route("/:userId").get((req,res,next)=>{
  users.findOne({_id: req.params.userId})
  .then((user)=>{
    if(!user){
      res.status(401).end('User Not Found');
    }
    else{
      res.status(200).json(user);
    }
  },((err)=>{
    res.status(401).end('User Not Found')
  })
  ).catch((err)=>next(err));
})

userRouter.route("/name/:userId").get((req,res,next)=>{
  users.findOne({_id: req.params.userId})
  .then((user)=>{
    if(!user){
      res.status(401).end('User Not Found');
    }
    else{
      res.status(200).json(user.name);
    }
  },((err)=>{
    res.status(401).end('Unknown Error')
  })
  ).catch((err)=>next(err));
});

userRouter.route("/deleteUser/:Id")
.delete((req,res,next)=>{
  users.deleteOne({_id: req.params.Id})
  .then((result)=>{
    Cart.deleteMany({user_id: req.params.Id})
    .then((result)=>{
      res.status(200).end('Account Deleted');
    },((err)=>next(err))
    ).catch((err)=>next(err))
  },((err)=>next(err))
  ).catch((err)=>next(err))
});

userRouter.route("/add-address/:Id")
.post((req,res,next)=>{
  users.findOne({_id: req.params.Id})
  .then((user)=>{
    if(user!=null){
      user.my_address.push(req.body);
      user.save()
      .then((user)=>{
        res.status(200).json(user);
      },(err)=>next(err));
    }
    else{
      err = new Error('User ' + req.params.Id + ' not found');
      err.status = 404;
      return next(err);
    }
  }, (err) => next(err))
  .catch((err) => next(err)
  );
})

userRouter.route("/orders/:Id")
.post((req,res,next)=>{
  users.findOne({_id:req.params.Id})
  .then((user)=>{
    if(user!=null){
      for(let i=0;i<req.body.length;i++){
        user.orders.push(req.body[i]);
      }
      user.save()
      .then((user)=>{
        res.status(200).json(user);
      },(err)=>next(err));
    }
    else{
      err = new Error('User ' + req.params.Id + ' not found');
      err.status = 404;
      return next(err);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.get((req,res,next)=>{
  users.findOne({_id:req.params.Id})
  .then((user)=>{
    if(user!=null){
      res.status(200).json(user.orders);
    }
  },(err)=>next(err))
  .catch((err)=> next(err))
})

module.exports=userRouter;