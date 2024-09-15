const express= require('express');
const router= express.Router();
const passport=require('passport');
const User= require('../model/user');
const { trusted } = require('mongoose');

// router.get('/fake', async (req,res)=>{

//     const user={
//         email:'S@gmail.com',
//         username:'Shahil'

//     }

//     const newUser= await User.register(user,'1234');
//     res.send(newUser);

// })


router.get('/register',(req,res)=>{
    res.render('auth/signup');
})
router.post('/register', async(req,res)=>{


    try{
        const{ username,email,password}=req.body;

        const user= new User({username,email});
        const newUser= await User.register(user,password);
    
        req.login(newUser, function(err) {
            if (err) { return next(err); }
            return res.redirect('/products' );
          });
    }
    catch (e){
        console.log(e.message);
        res.redirect('/register');

    }
 
    
});
router.get('/login',(req,res)=>{
    res.render('auth/login');
})

router.post('/login', passport.authenticate('local', {
    
    failureRedirect: '/login'
  }),(req,res)=>{
    console.log("Logged in sucessfully")
    res.redirect('/products');
  });
  router.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/products');
    });
  })

module.exports=router;