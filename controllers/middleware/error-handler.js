const {CustomApiError} = require('../errors/custom-error')
const errorHandler = (err,req,res,next)=>{
  if(err instanceof CustomApiError){
    return res.status(err.statusCode).json({msg:err.message})
  }
  else
   //console.log(err)
   return res.status(500).json({msg:'Something'})
}
module.exports = errorHandler
