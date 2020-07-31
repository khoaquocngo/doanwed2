const Sequelize = require('sequelize')
const db = require('./db');
const { sequelize } = require('./user');

const Model = Sequelize.Model;
class Fee extends Model {
    static async findid(id){
        return Fee.findOne({
              where:{
                  id,
              }
          })
      }
}
Fee.init({
    // attributes
    Name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fee: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    

}, 
{
    sequelize: db,
    modelName: 'fee'
});



module.exports = Fee;