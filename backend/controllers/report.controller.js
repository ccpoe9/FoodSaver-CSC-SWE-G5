var db = require('../config/db.config');

exports.GetReports = (req,res) => {
    let Q1 = `CALL GetReports(${req.query.customerID});`;
    console.log(Q1);
    db.query(Q1, (err,data,fields) =>{
        if(err){
            console.error(err.message);
            res.statusMessage = "SQL Error : " + err.message;
            return res.status(400).end();
        }
        res.send(data);
    });
}

exports.GetAdminReports = (req,res) => {
    let Q2 = `CALL GetAdminReports(${req.query.supplierID});`;
    console.log(Q2);
    db.query(Q2, (err,data,fields) =>{
        if(err){
            console.error(err.message);
            res.statusMessage = "SQL Error : " + err.message;
            return res.status(400).end();
        }
        res.send(data);
    });
}

