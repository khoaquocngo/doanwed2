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

      static async findName(Name){
        return Fee.findOne({
              where:{
                Name,
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