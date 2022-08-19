const Sequelize  = require("sequelize");
const connection = require("../database/database");

const Client = connection.define('clients',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }, age:{
        type: Sequelize.INTEGER,
        allowNull: false
    },cpf:{
        type: Sequelize.BIGINT,
        allowNull: false
    },adress:{
        type: Sequelize.STRING,
        allowNull: false
    }, phone:{
        type: Sequelize.BIGINT,
        allowNull: false
    }
})

//Client.sync({force: true})

module.exports = Client;