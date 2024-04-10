// const mongoose = require('mongoose');
const vendorModel = require('../models/vendor');
const asyncHandler = require('../utils/asyncHandler');
const appError = require('../utils/appError'); 
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const { default: mongoose } = require('mongoose');


const   createVendor =  asyncHandler(async(req,res)=>{

      const vendor = {
         firstName, lastName, email, password
      } = req.body;

      if(!vendor || !vendor.length === 0){
        throw new appError('provide valid details', 400)
      }
      const checkEmail = await vendorModel.findOne({email: email, active: true});
      if(checkEmail){
        throw new appError('user is not found!', 404)
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const vendorCreated = await vendorModel.create({
        firstName,
        lastName,
        email,
        password: hashPassword
      })
      return res.status(201).json({message:'vendor created successfully', data:vendorCreated})
})


const logIn = asyncHandler(async( req, res)=>{

    const  vendor ={email, password} = req.body;
    if(!vendor || !vendor.length === 0){
        throw new appError('provide valid details')
    }
     const checkUser = await  vendorModel.findOne({email: email, active : true})
     if(!checkUser){
        throw new appError('user is not found!', 404)
     }
     const isPasswordCorrect = await checkUser.isPasswordMatched(password);
     if(!isPasswordCorrect){
        throw new appError('passoword is Incorrect', 400)
     }
     const token = await  generateToken(checkUser._id);
     return res.status(200).json({message:'logIn sucessfully', data:{
        _id: checkUser._id,
        firstName:checkUser.firstName,
        lastName: checkUser.lastName,
        email:checkUser.email,
        token: token
     }})
})

const  getAllVendors = asyncHandler(async(req,res)=>{

     const Venders = await vendorModel.find().populate('firmId');
     if(!Venders ||!Venders.length === 0){
      throw new appError('provide valid details', 400)
     }
     return res.status(200).json({message:'fetched All venders', data: Venders});
})

const getSingleVender = asyncHandler(async(req,res)=>{
 
   const venderId = req.params.id;
   if(!mongoose.Types.ObjectId.isValid(venderId)){
      throw new appError('provide valid id', 400)
   }
   const venders = await vendorModel.findById({_id: venderId, active: true}).select('-passoword');
   if(!venders){
      throw new appError('vender is not found!', 404)
   }
   return res.status(200).json({message:"fetched single vender details", data: venders})

})


module.exports ={
    createVendor,
    logIn,
    getAllVendors,
    getSingleVender
}