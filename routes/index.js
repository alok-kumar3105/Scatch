const express=require('express');
const router=express.Router();
const isLoggedIn=require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', function(req,res){
    let error=req.flash("error");
    res.render('index', {error});
});

router.get('/shop', isLoggedIn, async (req, res)=>{
    let all_products=await productModel.find();
    let success=req.flash("success");
    res.render('shop', {all_products, success});
})

router.get('/addtocart/:id', isLoggedIn, async function(req, res){
    let id=req.params.id;
    let user= await userModel.findOne({email: req.user.email});
    user.cart.push(id);
    await user.save();
    req.flash("success", "Product added to cart!");
    res.redirect('/shop');
})
 
module.exports = router;