const router = require('express').Router();
const Yacht = require('../model/Yacht');
const User = require('../model/User');
const YachtType =require('../model/YachtType');
const verify = require('./verifyToken');
const pictureController = require('../controller/pictureController');
const yachtController = require ('../controller/yachtController');
const store = require('../middleware/uploadBinary');
const { yachtvalidation, yachtTypeValidation } = require('../validation');


//--Method to upload images to MongoDB as binary
router.post('/addPictures', store.array('images', 12),pictureController.uploadPicturesBinary);

//-- Method to add New Yacht
router.post('/addyacht',yachtController.addYacht);

//-- Method to Add Yacht Type
router.post('/addyachtType',yachtController.addYachtType);

//-- Method to update Yacht Type
router.put('/updateYachtType',yachtController.updateYachtType);

//Get ALl Yachts
router.get('/getYachts',yachtController.getAllYachts);

//Get Yacht By ID
router.get("/getYachtById", yachtController.getYachtById);

//Get Yacht By Name
router.get("/getYachtByName",yachtController.getYachtByName);

//-- Get YachrTypes
router.get("/getYachtTypes", yachtController.getYachtTypes );

//-- Get Yacht Type By Id
router.get("/getYachtTypeById",yachtController.getYachtTypeById ); 

//-- Get Yacht Type By Name
router.get("/getYachtTypeByName", yachtController.getYachtTypeByName);
 
//-- Get Bookingof a yacht
 router.get("/getBookings", yachtController.getYachtBookings);

 //-- Get Specification a yacht
 router.get("/getSpecifications", yachtController.getYachtSpecifications);

  //Add Yacht Specification
router.post('/addSpecification/:id', (req,res) =>{
   
  Yacht.findById(req.params.id,function(err,foundObject){
  if(!err){
    if(!foundObject){
      res.status(400).send('Yacht not found');
    }else{
      foundObject.specification.push(req.body);
      foundObject.save((err,result) => {
        
        if(!err){
          res.status(200).send(result);
        }else{
          res.status(400).send(err.message);
        }

      } );
    }


  }else{
    res.status(400).send(err.message);
  }

  });
 

});


//-- Update SPecification

 router.post('/updateSpecification/:id',(req,res) =>{
   
  Yacht.findById(req.params.id,function(err,foundObject){
  if(!err){
    if(!foundObject){
      res.status(400).send('Yacht not found');
    }else{
     
    foundObject.specification.id(req.body.id).specname = req.body.specname;
    foundObject.specification.id(req.body.id).value = req.body.value;

    foundObject.save((err,result) => {
        
        if(!err){
          res.status(200).send(result);
        }else{
          res.status(400).send(err.message);
        }

      } );
    }


  }else{
    res.status(400).send(err.message);
  }

  });
 

});

//-- Delete specification

router.post('/deleteSpecification/:id', (req,res) =>{

  Yacht.findById(req.params.id,(err,foundObject) =>{

    if(!err){
      if(!foundObject){
        
        res.status(400).send('Yacht not found');

      }else{
       foundObject.specification.id(req.body.id).remove((err,success) =>{

        if(err){
          res.status(400).send(err.message);
        }
        foundObject.save((saveError,saveResult) =>{

          if(!saveError){
            res.status(200).send(foundObject);
          }else{
            res.status(400).send(saveError.message);
          }

        });

       });

      }

    }
    else{

      res.status(400).send(err.message);
    }
  }); 

 

});

//AddBookings
router.post('/addBooking/:id',(req,res) => {

  Yacht.findById(req.params.id,(err,foundObject) =>{

    if(!err){
      if(!foundObject){
         res.status(400).send('Yatch not found');
      }else{ 

        //-- Check the user exists for booking
        User.findById(req.body.userid,(userError,foundUser) =>{

          if(!userError){
            if(!foundUser){
             res.status(400).send('User not found');
            }
          }
          else{
            res.status(400).send(userError.message);   
          }

        });

        foundObject.booking.push(req.body);

        foundObject.save( (saveError,saveResult) =>{
         if(!saveError){
           res.status(200).send(saveResult);

         }else{
            res.status(400).send(saveError.message);

         }

        });
      }

    }else{
      res.status(400).send(err.message);
    }
  });

});

//Update Booking

router.post('/updateBooking/:id',(req,res) => {

  Yacht.findById(req.params.id,(err,foundObject) =>{

    if(!err){
      if(!foundObject){
         res.status(400).send('Yatch not found');
      }else{ 

        //-- Check the user exists for booking
        User.findById(req.body.userid,(userError,foundUser) =>{

          if(!userError){
            if(!foundUser){
             res.status(400).send('User not found');
            }
          }
          else{
            res.status(400).send(userError.message);   
          }

        });

       // foundObject.booking.push(req.body);

        foundObject.booking.id(req.body.id).emptylegs = req.body.emptylegs;
        foundObject.booking.id(req.body.id).fromdate = req.body.fromdate;
        foundObject.booking.id(req.body.id).todate = req.body.todate;
        foundObject.booking.id(req.body.id).userid = req.body.userid;

        foundObject.save( (saveError,saveResult) =>{
         if(!saveError){
           res.status(200).send(saveResult);

         }else{
            res.status(400).send(saveError.message);

         }

        });
      }

    }else{
      res.status(400).send(err.message);
    }
  });

});


module.exports = router;