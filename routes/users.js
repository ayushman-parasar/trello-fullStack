var express = require('express');
var router = express.Router();
var User = require('../models/User')
var auth =require('../modules/middlewares')


/* GET users listing. */
// for displaying the registration form 
// router.get('/register', function(req, res, next) {
//   res.render('register');
// });

// for displaying the login form
// router.get('/login', function(req, res, next) {
//   res.render('login');
// });

// for saving the user in the database
router.post('/register',(req, res, next) => {
  let email = req.body.email;
  User.findOne({email:email},(err, userTemp)=>{
      if(err) return next(err)
      if(userTemp){
      res.json({"foundUser in register":userTemp})
    }else{
     User.create(req.body,(err, createdUser)=>{
      if(err) return next(err)
      res.json({"new Registered User" : createdUser})
     }) // res.redirect('/users/login')
    }
  })
})
router.get('/',auth.verifyToken, (req, res, next)=>{
  User.findById(req.userId,(err, user)=>{
    if(err) return next(err)
    res.json({user})
  })
})

// login post
// login using token
router.post('/login', async (req, res, next) => {
  try {
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found!" });
    }

    if (await user.verifyPassword(password)) {
      const token = auth.generateToken({ id: user.id });
      return res.json({ token, profile: user });
    }
  } catch(err) {
    console.log("err")
    next(err);
  }
})

// router.post('/login',(req, res, next)=>{
//  let {email, password} = req.body
//  User.findOne({email},(err,foundUser)=>{
//    console.log(foundUser)
//    if(err) return next(err);
//    if(!foundUser){
    
//      return res.json({"msg":"user not found"})
//    }
//    if(!foundUser.verifyPassword(password)){
     
//       return res.json({"msg":"pasword not matched"})
//    }
//     req.session.userId = foundUser.id
//     res.json({foundUser})
//  })
// })

// router.post('/login', (req, res) => {
//   var { email, password } = req.body;
//   User.findOne({email}, (err, user) => {
//     if(err) return res.redirect('/users/login');
//     if(!user) return res.redirect('/users/login');
//     if(!user.verifyPassword(password)) return res.redirect('/users/login');
//     req.session.userId = user.id;
//     res.redirect('/');
//   })
// })

module.exports = router;
