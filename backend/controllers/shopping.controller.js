var db = require('../config/db.config');

exports.AddtoCart = (req,res) => {
    let Q1 = `CALL AddtoCart(${req.body.customerID},${req.body.productID},${req.body.storeID});`;
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

exports.GetShoppingSessions = (req,res) => {
    let Q2 = `CALL GetShoppingSessions(${req.query.customerID});`;
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

