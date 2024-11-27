import express from 'express';
import { tasksData } from './tasksData';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router(); 

router.get('/', (req, res) => {
    res.json(tasksData);
});

// Get task details
router.get('/:id', (req, res) => {
    const { id } = req.params
    const task = tasksData.tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    return res.status(200).json(task);
});

//Add a task
router.post('/', (req, res) => {
    const { title, description, deadline, priority, done, created_at, updated_at } = req.body;
    const newTask = {
        id: uuidv4(),
        title,
        description,
        deadline,
        priority,
        done,
        created_at: getDate(),
        updated_at: getDate()
    };
    tasksData.tasks.push(newTask);
    res.status(201).json(newTask);
    tasksData.total_results++;
});

//Update an existing task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id); 
    const updated_at = getDate();
    if (taskIndex === -1) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    const updatedTask = { ...tasksData.tasks[taskIndex], ...req.body, id:id, created_at:req.created_at, updated_at:updated_at };
    tasksData.tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
});

//Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return res.status(404).json({status:404,message:'Task not found'});
    tasksData.tasks.splice(taskIndex, 1);
    res.status(204).send();
    tasksData.total_results--;
});

const getDate = () =>{
    return new Date().toISOString();
};

export default router;