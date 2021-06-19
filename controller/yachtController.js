const { yachtvalidation, yachtTypeValidation } = require('../validation');
const Yacht = require('../model/Yacht');
const YachtType =require('../model/YachtType');

module.exports ={
    addYacht : async (req,res) =>{

        //-- Data Validation
        
         const{error} = yachtvalidation(req.body);
         if (error) return res.status(400).send(error.details[0].message);
      
          const yacht = new  Yacht({
             name:req.body.name,
             typeid:req.body.typeid,
             parenttypeid: req.body.parenttypeid,
             shortdesription :req.body.shortdesription,
             fulldesription:req.body.fulldesription,
             showonhomepage:req.body.showonhomepage,
             point:req.body.point,
             markasnew:req.body.markasnew,
             height :req.body.height,
             length:req.body.length,
             status:req.body.status,
             picture:req.body.picture,
             specification:req.body.specification,
             booking:req.body.booking
      
          });
      
          try{
      
              const savedYacht = yacht.save();
              res.send({yacht:yacht._id});
          }
          catch(err){
              res.status(400).send(err);
          }
      
      },

      addYachtType : async (req,res) =>{

        const{error} = yachtTypeValidation(req.body);
         if (error) return res.status(400).send(error.details[0].message);
       
       const yachttype = new YachtType({
            typename :req.body.typename,
           description:req.body.description,
           parenttype:req.body.parenttype
            
        });
    
        try{
            const savedType = yachttype.save();
            res.send({yachtType:yachttype._id});
        }
        catch(err){
            res.status(400).send(err);
        }
    
    },

    updateYachtType :(req,res) =>{
 
        YachtType.findById({_id:req.body.id},async(err,foundObject) =>{
          if(err){
            console.log(err)
            res.status(500).send(err);
          }else{
            if(!foundObject){
              res.status(404).send('yatchtype not found');
            }else{
              if(req.body.id){
                foundObject.typename = req.body.typename;
                foundObject.description = req.body.description;
                foundObject.parenttype = req.body.parenttype;
              }
      
              foundObject.save((err,updatedObject) =>{
                if(err){
                  console.log(err);
                  res.status(400).send(err);
                }else{
                  res.send(updatedObject);
                }
              });
            }
      
          }
        })
      
      },

      getAllYachts:async (req,res) =>{
        Yacht.find({}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.json(result);
            }
          });
       
    },

    getYachtById:async (req, res) => {
    
        Yacht.findById( { _id: req.body.id }, function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        });
      },

      getYachtByName : async (req,res) =>{
        Yacht.find({name:req.body.name}, (err,result) =>{
           if(err){
             console.log(err);
             res.status(400).send(err.message);
           }else{
             res.json(result);
           }
        });
      },
      
      getYachtTypes : async (req,res) =>{
        YachtType.find({ },(err,result) => {
        if(err){
          res.status(400).send(err.message)
        }else{
          res.json(result);
        }
        });
        
        
        },

        getYachtTypeById : async (req,res) =>{
          YachtType.find( {"_id":req.body.id }, function(err, result) {
            if (err) {
              console.log(err);
              res.status(400).send(err.message);
            } else {
              res.json(result);
            }
          });
        },

        getYachtTypeByName :async (req,res) =>{
          console.log(req.body.typename);
          YachtType.find( {"typename":req.body.typename }, function(err, result) {
            if (err) {
              console.log(err);
              res.status(400).send(err.messagge);
            } else {
              res.json(result);
            }
          });
        },

        getYachtBookings :async (req,res) => {
              //-- Checking if the Yacht is  in the database
            //  const yachtExist = await Yacht.findOne({"_id":req.body.id});
            //  if(!yachtExist) return response.status(400).send('Yatch not exists')
          
              Yacht.findOne( {"_id":req.body.id ,"booking":{$exists:true}},'booking', function(err, result) {
                  if (err) {
                    console.log(err); 
                  } else {
                    res.json(result); 
                  }
                }); 
              
           },

           getYachtSpecifications :async (req,res) => {
    
            Yacht.findOne( {"_id":req.body.id ,"specification":{$exists:true}},'specification', function(err, result) {
                if (err) {
                  console.log(err);
                } else {
                  res.json(result);
                }
              }); 
            
         }


}