var db = require('../config/db.config');

exports.CreateShoppingSession = (req,res) => {
    let Q1 = `CALL CreateShoppingSession(${req.body.customerID}, ${req.body.storeID});`;

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
    let Q2 = `CALL CreateCartItem(${req.body.productID}, ${req.body.storeID}, ${req.body.customerID});`;

    db.query(Q2, (err,data,fields) =>{
        if(err){
            console.error(err.message);
            res.statusMessage = "SQL Error : " + err.message;
            return res.status(400).end();
        }
        res.send(data);
    });
}

exports.GetCartItemCount = (req,res) => {
    let Q2 = `CALL GetCartItemCount("${req.query.productName}", ${req.query.storeID});`;

    db.query(Q2, (err,data,fields) =>{
        if(err){
            console.error(err.message);
            res.statusMessage = "SQL Error : " + err.message;
            return res.status(400).end();
        }
        res.send(data);
    });
}

