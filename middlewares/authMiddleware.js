const JWT = require("jsonwebtoken");

module.exports = async (req,res,next)=>{
    try {
        const authHeader = req.headers["authorization"]
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
           return res.status(401).send({
             success: false,
             message: "Authorization token missing or malformed",
           });
        }

        const token = authHeader.split(" ")[1];
        if(!token){
          return res.status(401).send({
                success: false,
                message: "No token provided",
            });
        }
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
          if(err){
            return res.status(401).send({
                success:false,
                message:"Invalid or Expired token"
            })
          }
          else{
            req.user ={ userId:decode.userId} ;
            next();
          }
        })
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success:false,
            error:error.message,
            message:"Authentication failed"
        })
    }
}