const jwt = require('jsonwebtoken')
const{generateAccessToken} = require('./user-controller')


async function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    
    
    
   const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.status(400).send({success:false,message:"token not found"})
   
   jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
    if (err)
    {
        if(err.msg=="session expired"){
            return res.status(403).send({success:false,message:"Access Token not found"})
        }else{
            return res.status(400).send({success:false,message:err})
        }
    }
    req.body.user = user
    
    
    next()
})
    
}


async function createNewToken(req,res,next){
    
    const refreshToken = req.body.token
    if(refreshToken == null) return res.send("not found")
    if(await tokenSchema.findOne({token:refreshToken}) == null){
        return res.status(400).send("refresh token not found login again")
    }
    
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,user)=>{
        if (err) return res.send("not authentic token")
        const newAccessToken = generateAccessToken({name:user.name})
        res.send(newAccessToken)
        next()
    })

}
module.exports = {authenticateToken, createNewToken}