const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const middlewafe = require('../middleware/upload');
const {registerValidation,loginValidation} = require('../validation');
// const { response } = require('express');
const jwt = require('jsonwebtoken');
const registerController = require('../controller/registerController');
const upload = require('../middleware/upload');

const avtar = multer({
limits: {
  fileSize:1000000
  },
  fileFilter(req,file,cb) {

    if(!file.originalname.match(/\.(jpg|png|JPG|PNG|jpeg)$/))
       return cb(new Error('The file format is not allwed'));
     cb(undefined,true); 
    

  }
});

//User Regitration with Avathar
router.post('/registerUser',upload.single('avathar'), registerController.registerUser);

//User Registration
router.post('/register',async (request,response) =>{
  
  //-- Data Validation
    const{error} = registerValidation(request.body);
   if (error) return response.status(400).send(error.details[0].message);

  //-- Checking if the user is already in the database
  const emailExist = await User.findOne({email:request.body.email});
  if(emailExist) return response.status(400).send('Email already exists');

  //--Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword =await bcrypt.hash(request.body.password,salt);

  //Create a new user
   const user = new User({
        name :request.body.name,
        email:request.body.email,
        password:hashedPassword
    });
   
    try{
        const savedUser =  await user.save();
        response.send({User:user._id});
    }catch(err){
        response.status(400).send(err);
    }
    
});


//Delete User
router.post('/deleteUser',(req,res) => {
    User.findOneAndRemove(req.body.email)
.then(user => {
if(!user) {
  return res.status(404).send({
  message: "user not found with id " + req.params.id
});
}
res.send({message: "user deleted successfully!"});
}).catch(err => {
if(err.kind === 'ObjectId' || err.name === 'NotFound') {
  return res.status(404).send({
  message: "user not found with id " + req.params.id
});
}
return res.status(500).send({
  message: "Could not delete user with id " + req.params.id
});
});
})




//-- Update User Pasword
router.put("/updatePassword", (req,res) => {
     
   const _email = req.body.email;
     User.findOne({email:_email}, async (err,foundobject) =>{
        if(err){
            console.log(err);
            res.status(500).send();

        }else{
           
            if(!foundobject){
              res.status(404).send();
            }else{
               if(req.body.email){
                   
                 const salt = await bcrypt.genSalt(10);
                 const hashedPassword =await bcrypt.hash(req.body.password,salt);
                 foundobject.password = hashedPassword;

               } 

               foundobject.save( (err,updatedObject) =>{
                if(err){
                   console.log(err) ;
                   res.status(500).send();
                }else{
                   res.send(updatedObject) ;
                }
               });
            }
        }

     })
    
});


//Login
router.post('/login',async(request,response) =>{
    const{error} = loginValidation(request.body);
    if (error) return response.status(400).send(error.details[0].message);

    // Checking if the email exists
  
 const user = await User.findOne({email:request.body.email});
  if(!user) return response.status(400).send('Email or password is wrong');
  // Check the password is correct
  const validPass = await bcrypt.compare(request.body.password,user.password);
  if(!validPass) return response.status(400).send('Invalid Password');
//Create and assign a JWT Token
const token = jwt.sign({_id :user._id},process.env.TOKEN_SECRET);
//const token = jwt.sign({_id :user._id},'alkdnadklandasda');
response.header('auth-token',token).send(token);
 
});




module.exports= router;