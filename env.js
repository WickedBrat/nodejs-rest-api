require('dotenv').config();

exports.dbHost = process.env['DB_HOST'];
exports.dbPort = process.env['DB_PORT'];
exports.dbUser = process.env['DB_USER'];
exports.dbPassword = process.env['DB_PASSWORD'];
exports.dbName = process.env['DB_NAME'];
