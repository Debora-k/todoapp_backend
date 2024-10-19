const Task = require("../models/Task");
const taskController = {}

taskController.createTask = async(req,res) => {
    try{
        const { task, isComplete } = req.body;
        const { userId } = req; // from auth.controller(middleware)
        const newTask = new Task({task,isComplete, author:userId});
        await newTask.save();
        res.status(200).json({status:"success", data:newTask});
    } catch(err) {
        res.status(400).json({status:"failed", error:err});
    }
};

taskController.getTask = async(req,res) => {
    try {
        const taskList = await Task.find({}).select("-__v").populate("author");
        res.status(200).json({status:"success", data:taskList});
    } catch(err) {
        res.status(400).json({status:"failed", error:err});
    }
};

taskController.updateTask = async(req,res) => {
    try {
        const updatedTask = await Task.findById(req.params.id);
        if(!updatedTask) {
            throw new Error("Cannot find the task");
        }
        const fields = Object.keys(req.body);
        fields.map((item) => (updatedTask[item] = req.body[item]));
        await updatedTask.save();
        res.status(200).json({status:"success", data:updatedTask});
    } catch(err) {
        res.status(400).json({status:"failed", error:err});

    }
};

taskController.deleteTask = async(req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({status:"success", data:deleteTask});
    } catch(err) {
        res.status(400).json({status:"failed", error:err});

    }
}



module.exports = taskController;