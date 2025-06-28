const express=require('express');
const router = express.Router();
const ownerModel=require('../models/owner-model');

if(process.env.NODE_ENV==="development"){    
    router.post('/create', async (req, res)=>{
        let owners=await ownerModel.find();
        let {fullname, email, password}=req.body;
        if(owners.length<1){
            let owner=await ownerModel.create({
                fullname,
                email,
                password
            });
            res.status(201).send(owner);
        }
        else{
            res.status(500).send("You don't have permissions to create a new owner.");
        }
    })
}

router.get('/admin', function(req, res){
    let success=req.flash("success");
    res.render('createProducts', {success});
});

module.exports = router;
