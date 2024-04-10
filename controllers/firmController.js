const mongoose = require('mongoose');
const firmModel = require('../models/firm');
const asyncHandler = require('../utils/asyncHandler');
const venderModel = require('../models/vendor');
const appError = require('../utils/appError');

const addFirm = asyncHandler(async( req, res)=>{

    const venderId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(venderId)){
        throw new appError('Provide valid id',400)
    }
      const firms ={
        firmName, area, category, region, offer
      } = req.body;
      if(!firms || !firms.length === 0){
        throw new appError('provide valid details', 400)
      }
      const checkVender = await venderModel.findById({_id: venderId, active: true}).select('-password');
      if(!checkVender){
        throw new appError('Vender is not found!', 404)
      }
    
      const firmsAdd = await firmModel.create({
             firmName,
             area,
             category,
             region,
             offer,
             image: req.file ? req.file.fileName : undefined,
             vendorId: checkVender._id 
      })
      checkVender.firmId.push(firmsAdd);
     const check=  await checkVender.save();
      return res.status(201).json({message:'Firm is created successfully', data:firmsAdd, check});
})



const deleteFirm = asyncHandler(async(req,res)=>{

  const firmId = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(firmId)){
      throw new appError('provide valid Id', 400)
  }
  const checkFirm = await firmModel.findByIdAndDelete({_id: firmId, active: true});
  if(!checkFirm){
      throw new appError('firm is not found!', 404)
  }
  return res.status(200).json({message:'firm details deleted successfully', data:checkFirm});
})


module.exports = {
    addFirm,
    deleteFirm
}