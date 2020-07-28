const Sequelize = require('sequelize')
const User = require('./user')
const db = require('./db');
const { sequelize } = require('./user');

const Model = Sequelize.Model;
class Save extends Model {
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
    //0 Không kỳ hạn - 1 Có kỳ hạn
    type: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    //Tiền lại nhận được
    interest: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    //Kỳ hạn 3 tháng = 1 , 6 tháng = 2, 1 năm = 3
    term:
    {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    //Lãi suất - Không kì hạn 1.5% , 3 tháng 3% , 6 tháng 6%, 1 năm 9%
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