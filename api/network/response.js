exports.success = (req,res,msg,status=200,count=1) => {
    res.status(status).send({
        error:'',
        count:count,
        body:msg, 
    });
}
exports.error = (req,res,msg,status=500) => {
    res.status(status).send({
        error:msg,
        body:''
    })
}