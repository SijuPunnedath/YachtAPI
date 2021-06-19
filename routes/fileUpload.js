const router = require('express').Router();
const multer = require('multer');

//file upload to a server folder
 const upload = multer({
     dest: 'upload',
     limits:2000000,
     fileFilter(req,file,cb) {
         if(!file.originalname.match(/\.(jpg|png|JPG|PNG|jpeg)$/))
           return cb(new Error('File format is incorrect'));
        cb(undefined,true);
     }

 },(err,req,res,next) => res.status(400).send({error:err.message}));

 router.post('/uploadFile',upload.single('upload'),async (req,res) =>{
   res.send();
 })






module.exports = router;