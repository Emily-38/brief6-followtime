const mysql= require('mysql2/promise')

require('dotenv').config()

try{
module.exports.pool = mysql.createPool({
    host: process.env.SQL_URL,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD ,
    database:process.env.SQL_DATABASE ,
    waitForConnections: true,
    multipleStatements: true
})}catch(err){
    console.log(err)

}
