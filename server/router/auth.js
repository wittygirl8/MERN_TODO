const express = require('express');
const router = express.Router();

//Database Connection
require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req,res)=>{
    res.send('Hello todo from the server router.js');
});

router.post('/register', (req,res)=>{
    const { name, email, phone, password, cpassword } = req.body;
    
    if( !name || !email || !phone || !password || !cpassword ){
        return res.status(422).json({error:"Field is Required"})
        }

    //Registration of a user in mongoDB atles
    User.findOne({ email: email })
    .then((userExist) =>{
        if(userExist)
            return res.status(422).json({error:"Email already exists."});

        const user = new User({name, email, phone, password, cpassword})
        
        user.save().then(() =>{
            res.status(201).json({message: "user registered successfully."})
        }).catch((err) => res.status(500).json({ error: "Failed to registed"}));
    
    }).catch(err =>{console.log(err); });
});

module.exports=router;