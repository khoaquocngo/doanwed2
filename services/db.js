const Sequelize = require('sequelize')
<<<<<<< HEAD
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:Minhkhoa21@localhost:5432/Doanwed';
=======
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:nghiep0969323317@localhost:5432/todo';
>>>>>>> 12b90f66c6e6491a4f40a91aaa91447b9ff6b600

const db = new Sequelize(connectionString);
module.exports = db;