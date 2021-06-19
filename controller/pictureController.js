const Picture = require('../model/Picture');
const fs = require('fs');

exports.uploadPicturesBinary = (req,res,next) =>{

    const files = req.files;

    if(!files){
      const error = new Error('Please choose files');
      error.httpStatusCode = 400;
      return next(error); 

    }
    //-- convert images into base64 encoding
    let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
    });

    let result = imgArray.map((src, index) => {

        //-- create object to store data in the collection
        let finalImg = {
            filaName : files[index].originalname,
            mimeType : files[index].mimetype,
            pictureBinary : src,
            title : req.body.title,
            displayPosition :req.body.displayPosition
        }

        let newUpload = new Picture(finalImg);

        return newUpload
                .save()
                .then(() => {
                    console.log(`${newUpload._id} Uploaded Successfully...!` )
                    return {
                        id:newUpload._id,
                        msg : `${files[index].originalname} Uploaded Successfully...!`
                    }
                })
                .catch(error =>{
                    if(error){
                        if(error.name === 'MongoError' && error.code === 11000){
                            return Promise.reject({ error : `Duplicate ${files[index].originalname}. File Already exists! `});
                        }
                        return Promise.reject({ error : error.message || `Cannot Upload ${files[index].originalname} Something Missing!`})
                    }
                })


    })

    Promise.all(result)
        .then( msg => {
            
                 res.json(msg);
           
        })
        .catch(err =>{
            res.json(err);
        })
}

