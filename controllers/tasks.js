const Task = require('../models/tasks')
const asyncwrapper = require('./middleware/async')
const getAllTasks = asyncwrapper( async (req,res) =>{
    const tasks = await Task.find({})
    res.status(201).json({success:true,data:{tasks,count:tasks.length}})
})

const createTask = async(req,res) => {
  try {
    const task = await Task.create(req.body)
   res.status(201).json({task})
  } catch (error) {
    res.status(500).json({msg:error})
  }

}
const getTask =async (req,res) => {
  try {
   const {id:taskId} = req.params
   const task = await Task.findOne({_id:taskId})
   res.status(201).send(task)
   if(!task)
   return res.status(404).send({msg:'Task not found'})

  } catch (error) {
    res.status(500).send({msg:error.message})
  }
}
const updateTask = async(req,res) => {

try {

  const {id:taskID} = req.params
  const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
    new:true,
    runValidators:true
  })
  if(!task)
  return res.status(404).json({msg:'Task doesnt exists'})

  res.status(200).json(task)

} catch (error) {
  res.status(500).send({msg:error})
}

}
const deleteTask = async (req,res) => {
  try {
    const {id:taskId} = req.params
  const task = await Task.findOneAndDelete({_id:taskId})
  if(!task)
  return res.status(404).send({error:'No task with this id exists'})

  res.status(200).json(task)}
  catch(error){
    res.status(500).send({msg:error.message})
  }
 }
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask
}
