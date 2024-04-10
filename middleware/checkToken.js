const appError = require('../utils/appError');
const asynchHandler = require('../utils/asyncHandler');
const  jwt = require('jsonwebtoken');
const venderModel = require('../models/vendor');

const checkToken =  asynchHandler(async(req,res, next)=>{

    let Token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
        
        Token = req.headers.authorization.split(" ")[1];
        const decoded =  jwt.verify(Token,process.env.SECRET_KEY);
        req.user = await venderModel.findById(decoded.id).select('-password');
        next();
    }
    catch{
        throw new appError('Invalid Token', 400);
    }
    }
    if(!Token){
        throw new appError('Token not found', 404)
    }

})

module.exports = checkToken;