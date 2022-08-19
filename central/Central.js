const Sequelize = require("sequelize");
const connection = require("../database/database");
const Car = require("../cars/Car");

const Calendar = connection.define('calendar',{
    mounth:{
        type: Sequelize.STRING,
        allowNull: false
    }, week:{
        type: Sequelize.INTEGER,
        allowNull: false
    },event:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


//Car.sync({force: true})

module.exports = Calendar;