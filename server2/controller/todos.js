
const { Router } = require('express');
const { TodoTask } = require('../models/todoTask.model')

const router = Router();
const todoRouter = Router();

todoRouter.use('', router);
router.get('/todos', async (req, res) => {
    const todoFromDB = await TodoTask.find();
    res.status(200).json({ ...todoFromDB})
});


router.post('/add-todo', (req, res) => {
    // TodoTask= new TodoTask();
    console.log('add new todo')
    console.log(req.body);
    let todo = {
        "name": req.body.name,
        "description": req.body.description,
        "status": req.body.status,
    };
    todos.push(todo);
    console.log(todos)
    res.status(200).json({ todos })
});
////////////////////////// connect to DB ///////////////////


router.get("/get-todos", (req, res) => {
    console.log("get all list");

    TodoTask.find({}, function (err, todos) {
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

router.get('/add', async (req, res) => {

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
        res.status(200).json({ todos })

    } catch (err) {
        res.redirect("/");
    }
});

router.get('/delete', async (req, res) => {

    console.log("delete task");
    try {
        TodoTask.find({ id: req.body.id }).remove().exec();

        const todos = await TodoTask.find({})
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }
});

module.exports = { todoRouter }