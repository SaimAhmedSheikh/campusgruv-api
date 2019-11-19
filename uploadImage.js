const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './public/images')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ 
  storage: Storage,
  limits: { files: 3, fileSize: 10*1024*1024 },
  fileFilter: function(req, file, cb) {
    checkFileType()
  }
});
function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/ 
  const validExt = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const valid_mimetype = fileTypes.test(file.mimetype)
  if(validExt && valid_mimetype){
    return cb(null, true)
  } else {
    cb('Error: Not an image! Only jpeg|jpg|png|gif are allowed.')
  }
}
module.exports = {
  upload: upload
}
