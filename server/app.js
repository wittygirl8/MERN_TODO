const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
const app = express();

dotenv.config({ path: './config.env' });


//importing connection from differnt module
require('./db/conn');
//importing userSchema
//const User = require('./model/userSchema');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//router file using middlewares
app.use(require('./router/auth'));
const PORT = process.env.PORT;

app.get('/', (req,res)=>{
    res.send('Hello todo from the server');
});

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})
