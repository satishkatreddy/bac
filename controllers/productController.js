const mongoose = require('mongoose');
const productModel = require('../models/productModel');
const appError = require('../utils/appError');
const asyncHandler = require('../utils/asyncHandler');
const firmModel = require('../models/firm');


const addProduct = asyncHandler(async (req, res) => {

    const firmId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(firmId)) {
        throw new appError('provide valid id', 400)
    }
    const checkFirm = await firmModel.findById({ _id: firmId, active: true });
    if (!checkFirm) {
        throw new appError('firm is not found!', 404)
    }
    const productDetails = {
        productName, price, category, description, bestSeller
    } = req.body
    if (!productDetails || !productDetails.length === 0) {
        throw new appError('provide valid details', 400)
    }
    const products = await productModel.create({
        productName,
        price,
        image: req.file ? req.file.fileName : undefined,
        description,
        category,
        bestSeller,
        firmId: checkFirm._id
    })
    checkFirm.productId.push(products)
    const checks = await checkFirm.save();
    return res.status(201).json({ message: "proudcts is created  successfully", data: products, checks })
})


const getProductFirmID = asyncHandler(async (req, res) => {

    const firmId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(firmId)) {
        throw new appError('provide valid Id', 400)
    }
    const checkFirm = await firmModel.findById({ _id: firmId, active: true });
    if (!checkFirm || !checkFirm.length === 0) {
        throw new appError('provide valid Id', 404)
    }
    const productDetails = await productModel.find({ checkFirm: firmId}).populate('firmId', 'firmName').lean();
    if (!productDetails) {
        throw new appError('productDetails is not found!', 404)
    }
    return res.status(200).json({ message: "fetched product details sucessfully", data: productDetails })
})


const deleteProdcut = asyncHandler(async(req,res)=>{

    const productId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(productId)){
        throw new appError('provide valid Id', 400)
    }
    const checkProduct = await productModel.findByIdAndDelete({_id: productId, active: true});
    if(!checkProduct){
        throw new appError('product is not found!', 404)
    }
    return res.status(200).json({message:'product details deleted successfully', data:checkProduct});
})

module.exports = {
    addProduct,
    getProductFirmID,
    deleteProdcut
}