const mongoose = require('mongoose');
const DB = process.env.MONGO_URL;

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