require('dotenv').config();
const mySql = require('mysql');
const util = require('util');


//adatbázis
const db = mySql.createPool({
    host: process.env.db_hostname,
    user: process.env.db_user,
    passwrod: process.env.db_password,
    database: process.env.db_database,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})

//db átalakítás await-re
const query = util.promisify(db.query).bind(db);

module.exports = {query,db};
