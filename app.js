const express= require('express');
const app =express();
const path= require('path');

const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');

const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy= require('passport-local');
const User= require('./model/user');
// const cookieParser = require('cookie-parser');


mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
.then(()=>{
    console.log("DB Connected");

})
.catch((err)=>{
    console.log(err);

})

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));

// const sessionConfig={
//     secret: 'weneed secret',
//     resave: false,
//     saveUninitialized: true     
// }
// app.use(session(sessionConfig));
// app.use(flash());


const sessionConfig = {
    secret: 'weneedsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
       httpOnly:true,
       expires:Date.now() + 1000*60*24*7*1 ,
       maxAge: 1000*60*24*7*1
     } // Adjust the session expiration as per your needs
  };

  app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use( new LocalStrategy(User.authenticate()));  // teling the passport to check for username and password using authenicate method provided by passport-local mongoose
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



// Routes
const productRoutes=require('./routes/product');
const reviewRoutes=require('./routes/review');
const authRoutes=require('./routes/auth');

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);













const port =8000;
app.listen(port,()=>{
    console.log(`Server running at ${port}`);
})