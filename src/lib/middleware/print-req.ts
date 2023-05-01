 function printRequest(req,res,next){
    console.log(req.body)
    next()
}

export default printRequest