const express = require('express');
const router = express.Router();
const {addProduct, getProductFirmID, deleteProdcut}= require('../controllers/productController');

// const checkToken = require('../middleware/checkToken');
const upload = require('../middleware/images');


router.post('/addProduct/:id', upload.single('image'), addProduct);
router.get('/getProduct/:id', getProductFirmID);
router.delete('/delete/:id', deleteProdcut);
router.get('/uploads/:fileName',(req,res)=>{
    const fileName= req.params.fileName;
    res.headersSent('Content-Type', 'image/jpeg')
    res.sendFile(path.join(__dirname, '..', 'uploads', fileName));
 })

module.exports = router;