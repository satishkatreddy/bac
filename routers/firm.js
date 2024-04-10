const express = require('express');
const router = express.Router();
const {addFirm, deleteFirm}= require('../controllers/firmController');

const checkToken = require('../middleware/checkToken');
const upload = require('../middleware/images');
const path = require('path');


router.post('/addFirm/:id', upload.single('image'),  checkToken, addFirm);

router.get('/uploads/:fileName',(req,res)=>{
   const fileName= req.params.fileName;
   res.headersSent('Content-Type', 'image/jpeg')
   res.sendFile(path.join(__dirname, '..', 'uploads', fileName));
})

router.delete('/delete/:id',   deleteFirm);

module.exports = router;