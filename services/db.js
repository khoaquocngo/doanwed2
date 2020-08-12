const Sequelize = require('sequelize')
const connectionString = process.env.DATABASE_URL ||'postgres://postgres:Minhkhoa21@localhost:5432/Doanwed';
const db = new Sequelize(connectionString);
module.exports = db;