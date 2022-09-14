const jwt = require('jsonwebtoken')

async function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    
    
    
   const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.send("token not found")
   
   jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
    if (err)
    {
    return res.send("not authentic")
    }
    req.body.user = user
    next()
})
    
}
module.exports = {authenticateToken}