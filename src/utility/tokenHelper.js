const jwt = require('jsonwebtoken');
require('dotenv').config();

let key = process.env.JWT_SECRET;
const encodeToken = (email, user_id) => {
    let payload = {email, user_id};
    let expire = {expiresIn: '24h'}
    return jwt.sign(payload, key, expire)
}

const decodeToken = (token) => {
    try{
        return jwt.verify(token, key)
    }catch(e){
        return null
    }
}



module.exports = {
    encodeToken, decodeToken
}