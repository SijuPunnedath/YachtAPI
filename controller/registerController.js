const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../validation');

module.exports ={
 
    registerUser :
        async (request,response) =>{
  
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
              //-- Check if the the avthar file is attached
              if(request.file) {
                user.avathar = request.file.path;
              }
              try{
                  const savedUser =  await user.save();
                  response.send({User:user._id});
              }catch(err){
                  response.status(400).send(err);
              }
              
          }
    } 

