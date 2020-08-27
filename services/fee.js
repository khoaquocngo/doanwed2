const Sequelize = require('sequelize')
const db = require('./db');
const { sequelize } = require('./user');

const Model = Sequelize.Model;
class Fee extends Model {
    static async findid(id){
        return Fee.findOne({
              where:{
                  id,
              },
           
          })
      }

      static async findAlls(id){
        return Fee.findAll({
            order: [
                ['id', 'ASC']
            ],
           
          })
      }

      static async findName(Name){
        return Fee.findOne({
              where:{
                Name:Name
              }
          })
      }
}
Fee.init({
    // attributes
    Name: {
        type: Sequelize.STRING,
    },
    fee: {
        type: Sequelize.DOUBLE,
    },
    

}, 
{
    sequelize: db,
    modelName: 'fee'
});



module.exports = Fee;