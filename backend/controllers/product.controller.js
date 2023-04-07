var db = require('../config/db.config');

exports.GetProductsByStore = (req,res) => {

    let Q1 = `SELECT * FROM PRODUCTS`;

    db.query(Q1, (err,data,fields) =>{
        if(err){
            console.error(err.message);
            res.statusMessage = "SQL Error : " + err.message;
            return res.status(400).end();
        }
        res.send(data);
    });
}