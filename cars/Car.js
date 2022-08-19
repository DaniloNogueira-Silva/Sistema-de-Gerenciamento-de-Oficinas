const Sequelize = require("sequelize");
const connection = require("../database/database");
const Client = require("../clients/Client");

const Car = connection.define('cars',{
    marca:{
        type: Sequelize.STRING,
        allowNull: false
    }, modelo:{
        type: Sequelize.STRING,
        allowNull: false
    },ano:{
        type: Sequelize.INTEGER,
        allowNull: false
    },cor:{
        type: Sequelize.STRING,
        allowNull: false
    },placa:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Client.hasMany(Car);
Car.belongsTo(Client)

//Car.sync({force: true})

module.exports = Car;