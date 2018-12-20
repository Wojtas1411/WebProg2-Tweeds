mysql = require('mysql2');

module.exports = mysql.createPool({
    host: 'mysql',
    user: 'webprog',
    password: 'webprog',
    database: 'webprog',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })