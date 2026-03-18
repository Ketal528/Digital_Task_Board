const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// road 1 : get all tasks
router.get('/', async (req, res) =>{
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch (err){
        res.status(500).json({ message: err.message });
    }
});

// road 2 : post a new task
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const newTask = await task.save();
        res.status(201).json(newTask);
    }catch(err){
        res.status(500).json({ message: err.message });
    };
});

// road 3 : PATCH a task 
router.patch('/:id', async (req, res) => {
    try{
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new : true }
        );
        res.json(updateTask);
    }catch(err){
        res.status(400).json({ message: err.message });
    }
});

// ROAD 4: DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;