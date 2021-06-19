const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');
const Yatch = require('../model/Yacht');

router.get('/',verify,(request,response) => {

    response.send(request.user);
});

router.get('/add',(request,response) => {

    response.send({Mesage:'Test Message'});
});
router.post('/addyacht', (req,res) =>{

  res.send({Status:'Test'});
    const yacht = new  Yatch({
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
        res.send({yatch:yatch._id});
    }
    catch(err){
        res.status(400).send(err);
    }

});

module.exports = router;