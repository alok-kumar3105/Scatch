const express=require('express');
const router=express.Router();
const isLoggedIn=require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', isLoggedIn , async (req, res)=>{
    let user= await userModel.findOne({email: req.user.email}).populate('cart.product');
    res.render('cart', {user: user});
});

router.get('/addtocart/:id', isLoggedIn, async function(req, res){
    let id=req.params.id;
    let user= await userModel.findOne({email: req.user.email});
    // Check if product already exists in cart
    let cartItem = user.cart.find(item => item.product.toString() === id);
    if (cartItem) {
        cartItem.count += 1;
    } else {
        user.cart.push({ product: id, count: 1 });
    }
    await user.save();
    req.flash("success", "Product added to cart!");
    res.redirect('/shop');
});

router.get('/increase/:id', isLoggedIn, async function(req, res){
    let id=req.params.id;
    let user= await userModel.findOne({email: req.user.email});
    // Check if product already exists in cart
    let cartItem = user.cart.find(item => item.product.toString() === id);
    cartItem.count += 1;
    await user.save();
    res.redirect('/cart');
})

router.get('/decrease/:id', isLoggedIn, async (req, res)=>{
    let id=req.params.id;
    let user=await userModel.findOne({email: req.user.email});
    let cartItem=user.cart.find((item)=>{
        if(item.product.toString()===id){
            return item;
        };
    });
    cartItem.count-=1;
    if(cartItem.count===0){
        user.cart.splice(user.cart.indexOf(cartItem), 1);
    }
    await user.save();
    res.redirect('/cart');
});

router.get('/removeItem/:id', isLoggedIn, async (req, res)=>{
    let id=req.params.id;
    let user=await userModel.findOne({email: req.user.email});
    let cartItem=user.cart.find((item)=>{
        if(item.product.toString()===id){
            return item;
        };
    });
    user.cart.splice(user.cart.indexOf(cartItem), 1);
    await user.save();
    res.redirect('/cart');
})

module.exports = router;

