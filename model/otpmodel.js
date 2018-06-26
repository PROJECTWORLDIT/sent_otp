
var pool = require('../dbcon');

var otpObj = {
    addMsg:function(inpData, cb){
        pool.getConnection(function(err, con){
            if (err) {
                console.log(err);
            }
            else{
                var sql= "INSERT INTO `tbl_otp`(`mob_no`, `message`) VALUES ('"+inpData.number+"', '"+inpData.text+"')";
                console.log('sql 01='+sql);
                con.query(sql, function(err, result){
                    if (err) {
                        cb(err, null);
                    }
                    else{
                        cb(null, result);
                    }
                });
            }
        });
    },

    listMsg:function(inpData, cb){
        pool.getConnection(function(err, con){
            if (err) {
                console.log(err);
            }
            else{
                var sql= "select * from tbl_otp where mob_no='"+inpData.number+"' and message='"+inpData.text+"'";
                console.log('sql 01='+sql);
                con.query(sql, function(err, result){
                    if (err) {
                        cb(err, null);
                    }
                    else{
                        cb(null, result);
                    }
                });
            }
        });
    }
}

module.exports = otpObj;