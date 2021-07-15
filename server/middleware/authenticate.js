const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const User = require('../model/userSchema');


const authenticate  = async (req, res, next) =>{
    try{
        const token = req.cookies.jwtoken || 'No token ';
        //res.send("token:"+token);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        //res.send("verifyToken:"+verifyToken);
        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token" : token});
        res.send(rootUser);
        if(!rootUser) { 
                 throw new Error('User not Found') 
                 console.log('User not Found');
            }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    }
    catch(err){
        res.status(401).send('Unauthorized: No token found');
        console.log("");
    }    
}

module.exports = authenticate;