const Sequelize = require("sequelize");
const connection = require("../database/database");

const Article = connection.define('articles',{
    client:{
        type: Sequelize.STRING,
        allowNull: false
    }, body:{
        type: Sequelize.TEXT,
        allowNull: false
    }, car:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


//Article.sync({force: true})

module.exports = Article;