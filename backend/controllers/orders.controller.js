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