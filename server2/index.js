const express = require("express");
const app = express();

//enable cors
const cors = require("cors")

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

//enable send json
app.use(
    express.urlencoded({
      extended: true,
    })
  );
  
  app.use(express.json());

  const dotenv = require("dotenv");
  dotenv.config();
  const mongoose = require("mongoose");
//connection to db
// mongoose.set("useFindAndModify", false);


mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, 
  useFindAndModify: false,
  useUnifiedTopology: true }, () => {
console.log("Connected to db!");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
console.log("Connected successfully");
});


app.listen(4000, () => console.log("Server Up and running"));
});
// app.listen(4000, () => console.log("Server Up and running"));

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://noah:Nl123456!@cluster0.rsej721.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("todotasks");
//   console.log('connect');
//   collection.find().toArray(function(err, items) {console.log(items)});

//   //console.log(a);
//   // perform actions on the collection object
//   client.close();
//   app.listen(4000, () => console.log("Server Up and running"));

// });

const TodoTask = require("./models/TodoTask");

//hardcoded list
let todos = [{"name":"todo1","description":"test","status":true},{"name":"todo2","description":"test2","status":false}]


    app.get('/todos',(req, res) => {
     res.status(200).json({ todos })
    });


    app.post('/add-todo',(req, res) => {
        // TodoTask= new TodoTask();
        console.log('add new todo')
        console.log(req.body);
         let todo =  {
            "name": req.body.name,
            "description": req.body.description,
            "status": req.body.status,
        };
        todos.push(todo);
        console.log(todos)
         res.status(200).json({ todos })
    });
     ////////////////////////// connect to DB ///////////////////
  
     
app.get("/get-todos", (req, res) => {
  console.log("get all list");

  TodoTask.find({}, function(err, todos) {
    console.log(todos)
      res.status(200).json({ todos })
  });
  //let a = TodoTask.find({});
  // a is a query...

  // TodoTask.find({}, function(err, todos) {
  //     var todoMap = {};
  //     console.log(todos);

  //     todos.forEach(function(todo) {
  //       todoMap[todo._id] = todo;
  //       console.log(todo);
  //     });
  
  //     res.send(todoMap);  
  //   });

//   console.log(todos);

});

app.get('/add',async (req, res) => {
    
    console.log("add new task");
    const todoTask = new TodoTask({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
    });
    try {
    let a = await todoTask.save();
    console.log(a);
    //return all todos list
    const todos = await TodoTask.find({})
    res.status(200).json({todos})

    } catch (err) {
    res.redirect("/");
    }
});

app.get('/delete',async (req, res) => {
    
    console.log("delete task");
    try {
        TodoTask.find({ id:req.body.id }).remove().exec();

        const todos = await TodoTask.find({})
        res.status(200).json({todos})
    } catch (error) {
        throw error
    }
});

