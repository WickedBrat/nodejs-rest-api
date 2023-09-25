const { dbHost, dbPort, dbUser, dbPassword, dbName } = require("../../env");

module.exports = {
  HOST: dbHost,
  PORT: dbPort,
  USER: dbUser,
  PASSWORD: dbPassword,
  DB: dbName,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
