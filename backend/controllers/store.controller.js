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