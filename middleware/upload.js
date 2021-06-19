const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination :function(req,res,cb){
      cb(null,'upload/')  
    },
    filename:function(req,file,cb){
    
      let ext = path.extname(file.originalname)  
      cb(null,Date.now() +ext)
    }
});

var upload = multer({
    storage:storage,
    fileFilter:(req,file,callback) =>{
       if(
           
           file.mimetype == "image/png" ||
           file.mimetype == "image/jpg" ||
           file.mimetype == "image/jpeg"
       ) {
        callback(null,true)
       }else{
        console.log(file.mimetype);
        console.log( file.originalname);
        console.log('Only jpg & png files are supported');
        callback(null,false)
       }
    },
    limits: {
        fileSize :1024 * 1024*2
    }
});

module.exports = upload;