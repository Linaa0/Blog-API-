const jwt= require("jsonwebtoken");

module.exports= (role)=>{
   return (req,res,next) =>{
    if(!req.user){
        return res.status(401).json({msg: "No user found(token Invalid or missing"});
    }
    if(req.user.role !== role){
        return res.status(403).json("Access Denied");
    }
    next();
   };
}