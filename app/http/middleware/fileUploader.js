const multer = require('multer')
const path = require('path')
// const upload = multer({dest: '/public/images/'})

const Storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, path.join(__dirname, '../../../public/img'))
    },

    filename: function(req, file, callback){
        callback(null, file.originalname)
    }
})

const fileUploader = multer({
    storage: Storage
})

// function fileUploader(req, res, next){
//     upload.single('picture')
//     next()
// }

module.exports = fileUploader