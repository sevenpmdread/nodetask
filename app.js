const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
require('dotenv').config()
const connectDB = require('./db/connect')
const notfound = require('./controllers/middleware/notfound')
const errorHandlerMiddleware = require('./controllers/middleware/error-handler')

// routes

//midleware
app.use(express.static('./public'))
app.use(express.json())

app.get('/hello',(req,res)=>{
  res.send('Task Manager App')
})

app.use('/api/v1/tasks',tasks)
app.use(notfound)
app.use(errorHandlerMiddleware)

const port = 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log(`Port is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()

// get api/v1/tasks
// post api/v1/tasks
// get api/v1/tasks/:id
// patch api/v1/:id
// delete api/v1/tasks/:id
