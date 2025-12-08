const mysql = require ('mysql2');

const pool = mysql.createPool({
    host: proccess.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: proccess.env.DB_PASS || '',
    database: proccess.env.DB_NAME || 'e_cuti',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool.promise();