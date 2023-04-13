var db = require('../config/db.config');

exports.GetStores = (req, res) => {

    let Q1 = `CALL GetStoresByPage(${req.query.page}, @totalPages, @totalRecords); 
    SELECT @totalPages as TotalPages,@totalRecords as TotalRecords;`;
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

exports.GetAdminStores = (req, res) => {

    let Q2 = `CALL GetAdminStores(${req.query.supplierID});`;
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

exports.GetAllStores = (req, res) => {

    let Q3 = `SELECT * FROM STORES;`;
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