const { decodeToken } = require("../utility/tokenHelper");

module.exports=(req,res,next)=> {
    let token = req.headers['token'];
    if(!token){
        token = req.cookies['token']; 
    }

    let decoded = decodeToken(token)

    if(decoded===null) {
        return {status: "Failed!", msg: "Unauthorized!"}
    }else{
        let email = decoded['email']
        let user_id = decoded['user_id']

        req.headers.email = email;
        req.headers.user_id = user_id;
        next();
    }

}





// Alternative: 2

// let jwt = require('jsonwebtoken');
// require('dotenv').config();

// let KEY = process.env.SECURITY_KEY;
// module.exports=(req,res, next)=>{
//     let token = req.headers['token'];
//     jwt.verify(token, KEY, (err, decoded)=>{
//         if(err){
//             res.status(401).json({status:"Unauthorized!"})
//         }else{

//             //Get Username from Decoded token and Added with req header
//             let userName = decoded['data']['userName'];
//             console.log(userName);
//             req.headers.userName = userName;
//             next();
//         }
//     })
// }