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
    
}, 
{
    sequelize: db,
    modelName: 'interest'
});



module.exports = InteRestate;