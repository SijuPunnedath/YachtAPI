//Validation
const Joi = require('@hapi/joi');
const { schema } = require('./model/Yacht');

//Register Validation
const registerValidation = (data) =>{

    const schema =  {
        name:Joi.string()
             .min(6)
             .required(),
        email: Joi.string()
             .min(6)
             .required()
             .email(),
        password:Joi.string()
             .min(6)
             .required()
    };

   return Joi.validate(data,schema);
};

//login Validation
const loginValidation = (data) =>{

    const schema =  {
        email: Joi.string()
             .min(6)
             .required()
             .email(),
        password:Joi.string()
             .min(6)
             .required()
    };

   return Joi.validate(data,schema);
};

//Yacht Validation

const pictureSchema = Joi.object().keys({
     pictureid: Joi.string().required(),
     title:Joi.string(),
     description :Joi.string(),
     displayorder:Joi.number()
   
});

const specificationSchema = Joi.object().keys({
   specname :Joi.string().required(),
    value :Joi.string().required() 
});


const bookingSchema = Joi.object().keys({
     fromdate:Joi.date().required(),
     todate:Joi.date().required(),
     userid:Joi.string().required(),
     emptylegs: Joi.array().items(Joi.date().required())
})

const yachtvalidation = (data) =>{

     const schema = {
          
          name: Joi.string().min(6).required().max(255),
          typeid:Joi.string().required(),
          parenttypeid: Joi.string().optional(),
          shortdescription:Joi.string().required(),
           fulldescription: Joi.string(),ownerid:Joi.string().required(),
           showonhomepage:Joi.boolean(),
           point:Joi.number(),
           markasnew:Joi.boolean(),
           height:Joi.number(),
           length:Joi.number(),
           status:Joi.number().valid(0,1),
           picture:Joi.array().items(pictureSchema),
           specification:Joi.array().items(specificationSchema),
           booking:Joi.array().items(bookingSchema)
     };

     return Joi.validate(data,schema);
};

const yachtTypeValidation = (data) =>{
     const schema = {
          typename:Joi.string().required().min(6).max(150),
          description:Joi.string().required().min(6).max(300),
          parenttype:Joi.string()    
     };

     return Joi.validate(data,schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.yachtvalidation = yachtvalidation;
module.exports.yachtTypeValidation = yachtTypeValidation;