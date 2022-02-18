const Task = require('../models/tasks')
const asyncwrapper = require('./middleware/async')
const {createCustomError} = require('./errors/custom-error')
const getAllTasks = asyncwrapper( async (req,res) =>{
    const tasks = await Task.find({})
    res.status(201).json({success:true,data:{tasks,count:tasks.length}})
})

const createTask = asyncwrapper(async(req,res) => {
    const task = await Task.create(req.body)
   res.status(201).json({task})
})
const getTask = asyncwrapper(async (req,res,next) => {
   const {id:taskId} = req.params
   const task = await Task.findOne({_id:taskId})
   if(!task)
   {
     const error =createCustomError('Not Found',404)
     return next(error)
    }
    res.status(201).send(task)

})
const updateTask = asyncwrapper(async(req,res) => {
  const {id:taskID} = req.params
  const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
    new:true,
    runValidators:true
  })
  if(!task)
  return res.status(404).json({msg:'Task doesnt exists'})
  res.status(200).json(task)
})
const deleteTask = asyncwrapper(async (req,res) => {
  const {id:taskId} = req.params
  const task = await Task.findOneAndDelete({_id:taskId})
  if(!task)
  return res.status(404).send({error:'No task with this id exists'})
  res.status(200).json(task)
 })
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask
}
