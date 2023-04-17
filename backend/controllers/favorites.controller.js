var db = require('../config/db.config');

exports.GetFavorites = (req,res) => {
    let Q1 = `CALL GetFavorites(${req.query.customerID});`;
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

exports.AddFavorites = (req,res) => {
    let Q2 = `CALL AddFavorites(${req.body.customerID}, ${req.body.productID});`;
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

exports.RemoveFavorites = (req,res) => {
    let Q3 = `CALL RemoveFavorites(${req.query.customerID}, ${req.query.productID});`;
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