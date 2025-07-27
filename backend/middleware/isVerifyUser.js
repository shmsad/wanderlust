const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const isVerifyUser = (req, res, next) =>{
    let token = req.header('auth-token')
    if(!token){
        return res.status(401).json({
            success:false,
            message: "Please authenticate"
        })
    }
    let tokenUser = jwt.verify(token, secretKey)
    req.user = tokenUser.id
    next()
}
module.exports = isVerifyUser;