import jwt from "jsonwebtoken";

const authAdmin = async (req,res,next) =>{
    try {

        const authToken = req.headers.authorization
        if(!authToken) {
            return res.json({success:false, message:"Unauthorized: Missing Token"})
        }

        const token_decode = jwt.verify(authToken, process.env.JWT_SECRET)

        if(token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
            return res.json({success:false, message:"Forbidden: Not Admin"})
        }

        next()
    } catch(error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export default authAdmin;