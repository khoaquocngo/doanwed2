const Sequelize = require('sequelize')
const User = require('./user')
const db = require('./db');
const Interests = require('./inteRestate');

const Model = Sequelize.Model;
class Save extends Model {
    static async findAllAcount(userId) {
        return Save.findAll({
              where:{
                userId,
              },
              order: [
                ['id', 'DESC'],
            ],
          })
      }
    static async findByCode(code) {
        return Save.findOne({
              where:{
                code,
              }
          })
      }  
}
Save.init({
    // attributes
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    Money: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    //Tiền lại nhận được
    interest: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    //Kỳ hạn 3 tháng = 1 , 6 tháng = 2, 1 năm = 3
    term:
    {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    nameTerm:
    {
        type: Sequelize.STRING,
        allowNull: false,
    },
    interestRate:
    {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    //ngày gửi tiền
    sentDate:{
        type: Sequelize.DATE,
        allowNull: false,
    },
    //ngày tất toán 
    finalizeDate:{
        type: Sequelize.DATE,
    },
    finalize:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }

}, {
    sequelize: db,
    modelName: 'save'
});

User.hasMany(Save);
Save.belongsTo(User);




module.exports = Save;