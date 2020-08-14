const Sequelize = require('sequelize');
const User = require('./user');
const db = require('./db');

const Model = Sequelize.Model;
class Recharge extends Model {
    static async findCode(temp) {
        return Recharge.findAll({
              where:{
                code : temp
              }
          })
      }
      static async findAccuontRecharge(temp) {
        return Recharge.findAll({
              where:{
                accuontRecharge : temp
              }
          })
      }


   
}
Recharge.init({
    // attributes
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    accuontRecharge: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nameRecharge: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Money: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
    },
    content:
    {
        type: Sequelize.TEXT,
        allowNull: false,
    },

}, {
    sequelize: db,
    modelName: 'recharge'
});




module.exports = Recharge