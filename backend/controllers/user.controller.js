var db = require('../config/db.config');


exports.SignUp = (req,res) => {

    let Q1 = `CALL CustomerSignUp('${req.body.Username}' , '${req.body.Password}');`;
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

exports.Login = (req,res) => {

    let Q2 = `CALL CustomerSignIn('${req.body.Username}', '${req.body.Password}');`;
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

exports.AdminLogin = (req,res) => {

    let Q4 = `CALL SupplierAdminSignIn('${req.body.Username}' , '${req.body.Password}');`;
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