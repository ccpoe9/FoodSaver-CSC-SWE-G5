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

exports.RemoveFromCart = (req,res) => {
    let Q2 = `CALL RemoveFromCart(${req.query.customerID},${req.query.productID},${req.query.storeID});`;
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

exports.GetShoppingSessions = (req,res) => {
    let Q3 = `CALL GetShoppingSessions(${req.query.customerID});`;
    console.log(Q3);
    db.query(Q3, (err,data,fields) =>{
        if(err){
            console.error(err.message);
            res.statusMessage = "SQL Error : " + err.message;
            return res.status(400).end();
        }
        res.send(data);
    });
}


