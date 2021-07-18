const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");

//Database Connection
require('../db/conn');
const User = require('../model/userSchema');
const Task = require('../model/todoSchema');


router.get('/', (req,res)=>{
    res.send('Hello todo from the server router.js');
});

//Using Promises
// router.post('/register', (req,res)=>{
//     const { name, email, phone, password, cpassword } = req.body;
    
//     if( !name || !email || !phone || !password || !cpassword ){
//         return res.status(422).json({error:"Field is Required"})
//         }

//     //Registration of a user in mongoDB atles
//     User.findOne({ email: email })
//     .then((userExist) =>{
//         if(userExist)
//             return res.status(422).json({error:"Email already exists."});

//         const user = new User({name, email, phone, password, cpassword})
        
//         user.save().then(() =>{
//             res.status(201).json({message: "user registered successfully."})
//         }).catch((err) => res.status(500).json({ error: "Failed to registed"}));
    
//     }).catch(err =>{console.log(err); });


//Using async await
router.post('/register', async (req,res)=>{
    const { name, email, phone, password, cpassword } = req.body;
    
    if( !name || !email || !phone || !password || !cpassword ){
        return res.status(422).json({error:"Field is Required"})
        }

    //Registration of a user in mongoDB atles

    try{
        const userExist = await User.findOne({ email: email })

        if(userExist)
                return res.status(422).json({error:"Email already exists."});
        else if(password != cpassword)
            return res.status(422).json({error:"Password doesn't match"});
        else{
            const user = new User({name, email, phone, password, cpassword})
            
            //Password hasing Middelware: code is in userScema.js
        
            const userRegister = await user.save();
            if(userRegister){
                res.status(201).json({message: "user registered successfully."})
            }
            else{
                res.status(500).json({ error: "Failed to registed"})
            }
        }
    }
    catch(err){
        console.log(err);
    }
});


//login route
router.post('/login', async (req, res) => {
    // console.log(req.body);
    // res.json({message:"login awsome"});
    let token;
    try{
        const { email, password } = req.body;
        if( !email || !password ){
            return res.status(400).json({error:"Required"})
        }

        const userLogin = await User.findOne({ email: email });

        if(userLogin){
            
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            if(password != userLogin.password){
                res.status(400).json({error:"Invalid Credential"})
               
            }
            else{
                res.json({message:"User SignIn successfully"});
            }
        }
        else{
            res.status(400).json({error:"Requiered"})
        }
    }
    catch(err){
        console.log(err);
    }
});

//ToDO page 
router.get('/todo-task', authenticate, async(req,res)=>{
    console.log('TODO PAGE');
    const user_id = req.userID;
    const userExist = await Task.find({ user_id: user_id })
    res.send(userExist);
});

//ADD DATA
router.post('/add-todo-task', authenticate,async (req,res)=>{
    console.log(req.userID);
    const user_id = req.userID;
    var {task} = req.body;
    task = task.toLowerCase();
    console.log('ADD Task Page PAGE');
    console.log(user_id, task)
    if( !user_id || !task ){
        console.log("Field is Required");
        return res.status(422).json({error:"Field is Required"})
        }

    //Feeding task of a user in mongoDB Todo User 

    try{
            const user = new Task({user_id:user_id, task_name:task})
        
            const userRegister = await user.save();
            if(userRegister){
                res.status(201).json({message: "Data Added successfully."})
            }
            else{
                res.status(500).json({ error: "Failed to Add Data."})
            }
    }
    catch(err){
        console.log(err);
    }
});

//EDIT DATA
router.put('/edit-task', authenticate, async(req,res)=>{
    console.log('EDIT Task Page PAGE');
    var { oldTaskName, newTaskName } = req.body;
    console.log(req.body);
    if( !oldTaskName|| !newTaskName ){
        console.log("Field is Required");
        return res.status(422).json({error:"Field is Required"});
        }
    const user = req.userID;
    console.log(req.body);
    console.log("oldTaskName", oldTaskName);
    console.log("newTaskName", newTaskName);
    const updatedTask =  await Task.findOneAndReplace({task_name:oldTaskName.toLowerCase()}, {user_id:user, task_name:newTaskName.toLowerCase()});
    console.log(updatedTask);
    res.send(updatedTask);
});

router.delete('/delete-task',  async(req,res)=>{
    console.log("In delete.");
    var { taskName } = req.body;
    console.log(req.body);
    console.log("taskName:",taskName);
    const deletedTask =  await Task.findOneAndDelete({task_name:taskName.toLowerCase()});
    console.log(deletedTask);
    res.send(deletedTask);
});
module.exports=router;