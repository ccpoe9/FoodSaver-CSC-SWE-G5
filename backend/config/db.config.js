var mysql = require('mysql');

let dbconfig = {
    connectionLimit : 4,
    host : 'localhost',
    user : 'root',
    password : 'T:niuchaYL!2395',
    database : 'foodsaver',
    multipleStatements: true
}

var pool = mysql.createPool(dbconfig);

pool.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Database connected successfully');
    connection.release();
});

module.exports = pool;
