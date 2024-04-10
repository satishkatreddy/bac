const multer = require('multer');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        return cb(null, 'uploads/')
    },
    filename:function(req, file, cb){
        return cb(null, `${Date.now()}_${file.filename}_${file.originalname}`)
    },
})

const uploads = multer({
    storage:storage,
    limits:{
        fileSize:1000000 //1 mb
    }
})

module.exports = uploads;