var db = require('../config/db.config');


exports.SignUp = (req,res) => {

    let Q1 = `INSERT INTO CUSTOMERS(\`Username\`, \`Password\`)
    VALUES ('${req.body.Username}' , '${req.body.Password}');`;

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

    let Q2 = `SELECT * FROM CUSTOMERS WHERE 
    \`Username\` = '${req.body.Username}' 
    AND \`Password\` = '${req.body.Password}'`;

    db.query(Q2, (err,data,fields) =>{
        if(err){
            console.error(err.message);
            res.statusMessage = "SQL Error : " + err.message;
            return res.status(400).end();
        }
        res.send(data);
    });
}