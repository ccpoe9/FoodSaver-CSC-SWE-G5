var db = require('../config/db.config');

exports.CreateOrder = (req,res) => {
    let Q1 = `CALL CreateOrder(${req.body.CartCount}, ${req.body.Price}, ${req.body.storeID}, ${req.body.customerID},
    ${req.body.sessionID});`;
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

exports.GetOrders = (req,res) => {
    let Q2 = `CALL GetOrders(${req.query.customerID});`;
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

exports.GetAdminOrders = (req,res) => {
    let Q3 = `CALL GetAdminOrders(${req.query.storeID});`;
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

exports.GetOrderDetails = (req,res) => {
    let Q4 = `CALL GetOrderDetails(${req.query.orderID});`;
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

exports.EditOrders = (req,res) => {
    let Q5 = `CALL EditOrders(${req.body.orderID}, '${req.body.orderStatus}', '${req.body.deliveryDate}');`;
    console.log(Q5);
    db.query(Q5, (err,data,fields) =>{
        if(err){
            console.error(err.message);
            res.statusMessage = "SQL Error : " + err.message;
            return res.status(400).end();
        }
        res.send(data);
    });
}
