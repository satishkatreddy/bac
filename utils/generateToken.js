const  jwt = require('jsonwebtoken');


const generateToken = (id)=>{

    let token;
    token = jwt.sign({id}, process.env.SECRET_KEY, {expiresIn:'2h'})
    return token;

}

module.exports = generateToken;