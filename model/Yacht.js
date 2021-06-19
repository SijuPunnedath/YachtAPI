const mongoose = require('mongoose');


const pictureSchema = new mongoose.Schema({

    pictureid:{
        type:String,
        require:true
    },
    title :{
        type: String,
        require:true,
        
    },
    description:{
        type:String

    },
    displayorder:{
     type:Number
    }


});

specificationSchema  = new mongoose.Schema({
    specname: {
        type:String,
        require:true
    },
    value:{
        type:String,
        require:false
    }

});

bookingSchema = new mongoose.Schema({
   fromdate:{
       type:Date,
       require:true
   },
   todate:{
       type:Date,
       require:true
   },
   userid:{
       type:String,
       require:true
   },
   emptylegs:{
       type:[Date],
       require:false
   }
});


const yachtSchema = new  mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:6,
        max:255
    },

    typeid:{
        type:String,
        require:true
    },
    parenttypeid:{
        type:String,
        require:false,
    },
    shortdescription:{
        type:String,
        require:true,
        min:6,
        max:250
    },
     fulldescription:{
        type:String,
        min:6,
        max:500,
        require:false
    },
    ownerid:{
        type:String,
        require:true,
    },
    showonhomepage:{
        type:Boolean,
        require:false,
        default:false
    },
    point:{
        type:Number,
        require:false,
        default:0
    },
    isnew:{
        type:Boolean,
        require:false,
        default:false
    },
    height :{
        type:Number,
        require:false
    },
    length:{
        type:Number,
        require:false
    },
    status :{
        type : Number,
        enum:[0,1],
        default:0,
        require:false
    },
    picture:{
       type:[pictureSchema],
       required:false
   },
   
   specification:{
       type:[specificationSchema],
       require:false
    },
booking :{
    type:[bookingSchema],
    require:false
}

});


module.exports=mongoose.model('Yatch',yachtSchema);