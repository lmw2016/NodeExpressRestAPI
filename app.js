const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const app=express();
const db=mongoose.connect('mongodb://localhost/bookApi',{useNewUrlParser: true,useUnifiedTopology: true}); //must be bookApi to match db name case
const bookRouter=express.Router();

const port=process.env.PORT||3000;
const Book=require('./models/bookModel');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter.route('/books')
.post((req,res)=>{
  const book=new Book(req.body);
  book.save();
  console.log(book);
  return res.status(201).json(book);
})
  .get((req,res)=>{
     //const {query}=req;
     const query={};
     if(req.query.genre){
       query.genre=req.query.genre;
     }
      Book.find(query,(err,books)=>{
        if(err){
          return   res.send(err);
        }
        return  res.json(books);
        
      });
  })

  bookRouter.route('/books/:bookId')
  
  .get((req,res)=>{
    
      Book.findById(req.params.bookId,(err,books)=>{
        if(err){
          return   res.send(err);
        }
        return  res.json(books);
        
      });
  })

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