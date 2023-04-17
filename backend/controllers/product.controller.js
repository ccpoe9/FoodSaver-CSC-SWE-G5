var db = require('../config/db.config');

exports.GetProductsByStore = (req,res) => {
    let Q1 = `CALL GetProductsByPage(${req.query.page}, ${req.query.storeID}, ${req.query.customerID}, @totalPages, @totalRecords); 
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

exports.GetAdminProducts = (req,res) => {
    let Q7 = `CALL GetAllProducts(${req.query.storeID});`;
    console.log(Q7);
    db.query(Q7, (err,data,fields) =>{
        if(err){
            console.error(err.message);
            res.statusMessage = "SQL Error : " + err.message;
            return res.status(400).end();
        }
        res.send(data);
    });
}

exports.GetProductsByType = (req,res) => {
    let Q2 = `CALL GetProductsByType('${req.query.type}', ${req.query.customerID});`;
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

exports.GetProductsByTypeStore = (req,res) => {
    let Q3 = `CALL GetProductsByTypeStore(${req.query.page}, ${req.query.storeID}, "${req.query.type}", ${req.query.customerID},  @totalPages, @totalRecords); 
    SELECT @totalPages as TotalPages, @totalRecords as TotalRecords;`;
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

exports.GetProductsBySearch = (req,res) => {
    let Q4 = `CALL GetProductsBySearch('${req.query.search}', ${req.query.customerID});`;
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

exports.CreateProduct = (req,res) => {
    let Q5 = `CALL CreateProduct("${req.body.Name}", "${req.body.Price}", "${req.body.ExpireDate}","${req.body.Type}",
    "${req.body.Description}","${req.body.Image}",${req.body.Quantity},${req.body.StoreID});`;
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

exports.DeleteProduct = (req,res) => {
    let Q6 = `CALL DeleteProduct(${req.query.productID});`;
    console.log(Q6);
    db.query(Q6, (err,data,fields) =>{
        if(err){
            console.error(err.message);
            res.statusMessage = "SQL Error : " + err.message;
            return res.status(400).end();
        }
        res.send(data);
    });
}



