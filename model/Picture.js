const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({

    pictureBinary :{
        type:String,
        require :true
    },
    mimeType :{
        type: String,
        require:true
    },
    filaName :{
        type:String,
        require:true
    },
    title :{
        type:String
    },
    displayPosition:{
        type :Number
    }

});

module.exports = mongoose.model('Picture',pictureSchema);