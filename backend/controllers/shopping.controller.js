var db = require('../config/db.config');

exports.CreateShoppingSession = (req,res) => {
    let Q1 = `CALL CreateShoppingSession(${req.body.customerID}, ${req.body.storeID});`;
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

exports.CreateCartItem = (req,res) => {
    let Q2 = `CALL CreateCartItem(${req.body.productID} ,${req.body.customerID}, ${req.body.storeID});`;
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

exports.RemoveCartItem = (req,res) => {
    let Q3 = `CALL RemoveCartItem(${req.query.productID} ,${req.query.customerID}, ${req.query.storeID});`;
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
exports.GetShoppingSessions = (req,res) => {
    let Q4 = `CALL GetShoppingSession(${req.query.customerID});`;
    console.log(Q4);
    db.query(Q4, (err,data,fields) =>{
        if(err){
            console.error(err.message);
            res.statusMessage = "SQL Error : " + err.message;
            return res.status(400).end();
        }
        res.send(data);
    });
}