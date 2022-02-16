const mongoose = require('mongoose')

const connectionString = "mongodb+srv://aditya:aditya@cluster0.1gl5o.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority"


const connectDB = (url) => {
   return mongoose
   .connect(url,{
     useNewUrlParser:true,
     useCreateIndex:true,
     useFindAndModify:false,
     useUnifiedTopology:true
   })

}

// WE ARE returning a promise

module.exports = connectDB
