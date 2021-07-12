const express = require('express');
const app = express();
const PORT= 3000;
const mongoose = require('mongoose');

const DB = 'mongodb+srv://riddhi:riddhi@cluster0.sqnri.mongodb.net/mernstack?retryWrites=true&w=majority'
//riddhi
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() =>{
    console.log('Connection Successful.');
}).catch(
    (err) => console.log(`No connection.`)
);


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


app.get('/register', (req,res)=>{
    res.send('Hello world register the server');
});

app.listen(3000, ()=>{
    console.log(`Server is running at port ${PORT}`)
})
