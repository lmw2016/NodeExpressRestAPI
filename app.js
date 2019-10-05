const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const app=express();
const db=mongoose.connect('mongodb://localhost/bookApi',{useNewUrlParser: true,useUnifiedTopology: true}); //must be bookApi to match db name case
//const bookRouter=express.Router();

const port=process.env.PORT||3000;
const Book=require('./models/bookModel');
const bookRouter=require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api',bookRouter);

app.get('/',(req,res)=>{
  res.send('welcome to my api - HAHA');
})

app.listen(port,()=>{
  console.log(`running on port ${port}`);
})

//1.install mongodb
//2.open cmd as admin, run mongod under C:\Program Files\MongoDB\Server\4.2\bin>mongod
//3.copy booksJson to C:\Program Files\MongoDB\Server\4.2\bin>mongod
//4.open another cmd as admin, run: mongo bookApi < booksJson.js  (bookApi is the db name)