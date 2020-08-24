const Sequelize = require('sequelize')
const db = require('./db');
const { sequelize } = require('./user');

const Model = Sequelize.Model;
class InteRestate extends Model {
    static async findid(id) {
        return InteRestate.findOne({
              where:{
                  id,
              }
          })
      }
    
    static async findName(Name) {
        return InteRestate.findOne({
              where:{
                Name,
              }
          })
      }

    static async find() {
        return InteRestate.findAll({
              order: [
                ['id', 'ASC']
            ],
          })
      }
   
}
InteRestate.init({
    // attributes
    Name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    interest: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    numberMonth: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
    
}, 
{
    sequelize: db,
    modelName: 'interest'
});



module.exports = InteRestate;