const express=require('express');
const router=express.Router();
const Product=require('../model/product');
const Review = require('../model/review');
const { validateProduct, isLoggedIn } = require('../middleware');

router.get('/products', async(req,res)=>{
    try{
        const products=await Product.find({});
        res.render('products/index',{products});

    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
   
})
router.get('/products/new',isLoggedIn,(req,res)=>{

  
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
    
})
router.post('/products',isLoggedIn, validateProduct, async (req,res)=>{
    try{

        const {name,img,price,desc}=req.body;
        await Product.create({name,img,price:parseFloat(price),desc});
       
        res.redirect('/products');
    }
    catch(e){
        
        res.status(500).render('error',{err:e.message});
    }



})

router.get('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findById(id).populate('reviews');
        // console.log(product);
        res.render('products/show',{product});
    }
  
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

})
router.get('/products/:id/edit',isLoggedIn,async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findById(id);
        res.render('products/edit',{product});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

})
router.patch('/products/:id',isLoggedIn,validateProduct,async(req,res)=>{


    try
    {
        const {id}=req.params;
        const {name,img,price,desc}=req.body;
        await Product.findByIdAndUpdate(id,{name,img,price:parseFloat(price),desc});
       
        res.redirect(`/products/${id}`);

    }
 

    catch(e){
        
        res.status(500).render('error',{err:e.message});
    }
    
})
router.delete('/products/:id',isLoggedIn,async(req,res)=>{

    try{
        const {id}=req.params;
        // const product=await Product.findById(id);
        // one way but not ideal way to do this
    
        // for(let id of product.reviews)
        // {
        //     await Review.findByIdAndDelete(id);
        // }
        await Product.findByIdAndDelete(id);
        res.redirect('/products')
    }
   

    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})





module.exports=router;