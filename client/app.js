const express = require('express');
const app = express();
const PORT= 3000;


app.get('/todo', (req,res)=>{
    res.send('Hello todo from the server');
});

app.get('/login', (req,res)=>{
    res.send('Hello login from the server');
});

app.get('/register', (req,res)=>{
    res.send('Hello world register the server');
});

app.listen(3000, ()=>{
    console.log(`Server is running at port ${PORT}`)
})
