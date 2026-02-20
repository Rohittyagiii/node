const express = require('express');
const {connectMongoDb} = require('./connection')
const userRouter = require('./routes/user')
const {logReqRes} = require('./middleware')
const app = express();

//connection 
connectMongoDb('mongodb://127.0.0.1:27017/project-1')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(logReqRes('log.txt'))

//Routes
app.use("./user",userRouter)
 
app.listen(4000, () => {
    console.log('Server Started on Port 4000');
});
