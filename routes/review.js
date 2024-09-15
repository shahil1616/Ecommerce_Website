const express =require('express');

const router =express.Router();

const Product=require('../model/product');
const Review =require('../model/review');
const { validateReview,isLoggedIn } = require('../middleware');




router.post('/products/:productid/review',isLoggedIn,validateReview, async(req,res)=>{

    try{

        const {productid}=req.params;
        const{rating,comment}=req.body;
    
        const product = await Product.findById(productid);
        const review =  new Review({rating,comment});
        const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
        product.avgRating = parseFloat(newAverageRating.toFixed(1));
    
        product.reviews.push(review);
        await review.save();
        await product.save();
       
        
        res.redirect(`/products/${productid}`);
    }
    catch(e)
    {

        res.status(500).render('error',{err:e.message});

    }
  
})

module.exports=router;