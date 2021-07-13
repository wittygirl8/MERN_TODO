const express = require('express');
const dotenv = require('dotenv')
const app = express();

dotenv.config({ path: './config.env' });


//importing connection from differnt module
require('./db/conn');
//importing userSchema
//const User = require('./model/userSchema');

app.use(express.json());
//router file using middlewares
app.use(require('./router/auth'));
const PORT = process.env.PORT;



//Middelware
const middleware = (req, res, next) => {
    console.log(`Hello My Middleware.`);
    next();
}

app.get('/', (req,res)=>{
    res.send('Hello todo from the server');
});

app.get('/todo', middleware, (req,res)=>{
    res.send('Hello todo-list from the server');
});

app.get('/login', (req,res)=>{
    res.send('Hello login from the server');
});


app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})
