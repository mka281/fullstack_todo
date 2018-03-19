var express = require('express');
var router = express.Router();
var db = require("../models");

/// INDEX ROUTE
router.get('/', function(req, res) {
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    });
});

/// CREATE ROUTE
router.post('/', function(req, res) {
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    });
});

/// SHOW ROUTE
router.get('/:todoId', function(req, res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    });
});

/// UPDATE ROUTE
router.put('/:todoId', function(req, res){
   db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
   .then(function(todo){
       res.json(todo);
   })
   .catch(function(err){
       res.send(err);
   });
});

/// DELETE ROUTE
router.delete('/:todoId', function(req, res){
    db.Todo.remove({_id: req.params.todoId}) 
    .then(function(){
        res.json({message: 'DELETED!'});
    })
    .catch(function(err){
        res.send(err);
    });
});


module.exports = router;