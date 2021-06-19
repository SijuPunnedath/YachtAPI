const mongoose = require('mongoose');

const yachtTypeSchema = new  mongoose.Schema({

   
    typename :{
       type : String,
       require:true,
       min:6,
       max:150
    },
    description:{
        type:String,
        require:true,
        min:6,
        max:300
    },
   parenttype:{
       type:String,
       require:false
   }
});


module.exports=mongoose.model('YachtType',yachtTypeSchema);