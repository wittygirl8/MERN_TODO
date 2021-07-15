const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    cpassword: { type: String, required: true },
    tokens:[
      {
        token:{ type: String, required: true}
      }
    ],
    todos: [
      {
       task:{ type: String, required: true }
      }
     ]
  });

  //Token generation

  userSchema.methods.generateAuthToken = async function(){
    try{
      let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({ token:token });
      await this.save();
      return token;
    } 
    catch(err){
      console.log(err);
    }
  }

  userSchema.methods.addTask = async function(task){
    try{
      this.todos = this.todos.concat({ task:task });
      await this.save();
      return task;
    } 
    catch(err){
      console.log(err);
    }
  }


  module.exports = mongoose.model('USER', userSchema);

