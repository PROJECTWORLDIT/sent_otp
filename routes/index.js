var express = require('express');
var otpmodel = require('../model/otpmodel');
var Nexmo = require('nexmo');

var router = express.Router();

var nexmo = new Nexmo({
  apiKey:'',
  apiSecret: ''
}, {debug:true});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/senddata', function (req, res, next) {
  console.log('01 req body=' + req.body.mykey);
  var formData = JSON.parse(req.body.mykey);
  otpmodel.addMsg(formData, function (err, result) {
    if (err) {
      console.log("err");
    }
    else {
      var res1 = result;
      
      otpmodel.listMsg(formData, function (err, resultdata) {
        if (err) {
          var resData = {
            sts: '1',
            msg: 'fail'
          }
          res.send(resData);
        }
        else {
          nexmo.message.sendSms(
            '12345678901', resultdata[0].mob_no, resultdata[0].message, {type : 'unicode' },
            (err, responceData) => {
              if (err) {
                console.log(err);
              }
              else{
                console.log('here is log='+JSON.stringify(responceData));
                console.dir(responceData);
                /* var resData = {
                  sts:"0",
                  msg:"success",
                  mobno:formData.number
                } */
                //var datares = JSON.parse(JSON.stringify(resData));
                res.send(responceData);
              }
            } 
          );
        }

      });
    }
  });

});




       /*  console.log("here is=" + err, result);

        console.log('result=' + result[0].mob_no + "res2" + result[0].message);
        var mob = result[0].mob_no;
        var msg = result[0].message;
 */       /*  console.log('here is log='+JSON.stringify(responceData));
              console.dir(responceData);
        */       
        
        //var datares = JSON.parse(JSON.stringify(resData));


        /*  nexmo.message.sendSms(
          '12345678901', formData.number, formData.text, {type : 'unicode' },
          (err, responceData) => {
            if (err) {
              console.log(err);
            }
            else{
              console.log('here is log='+JSON.stringify(responceData));
              console.dir(responceData);
              var resData = {
                sts:"0",
                msg:"success"
              }
              var datares = JSON.parse(JSON.stringify(resData));
              res.send(datares);
            }
          } 
        ); */



     

module.exports = router;
