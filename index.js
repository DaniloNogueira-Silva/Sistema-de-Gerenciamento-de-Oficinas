const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const session = require("express-session");
const connection = require("./database/database");




//Importanto as tabelas:
const Car = require("./cars/Car");
const Client = require('./clients/Client');
const User = require("./user/User");
const Article = require("./articles/Article");


//Importando as rotas:
const ArticlesController = require("./articles/ArticlesController");
const ClientsController = require("./clients/ClientsController");
const CarsController = require("./cars/CarsController");
const UserController = require("./user/UserController")
const CentralController = require("./central/CentralController")

//view engine
app.set('view engine', 'ejs');


//Sessions
app.use(session({
    secret: "hfjwjhw5rhwwythwhw57jwj5ywj75jwyj", cookie:{maxAge: 30000000}
}));

//static
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//database

connection.authenticate().then(() =>{
    console.log("Conexão com sucesso")
}).catch((error) =>{
    console.log(error)
})

//está usando as rotas definidas:
app.use("/", ClientsController);
app.use("/", CarsController);
app.use("/", UserController);
app.use("/", CentralController);
app.use("/", ArticlesController);



//routes
app.get("/", (req, res)=>{
    res.render("index")
})




app.listen(8050, ()=>{
    console.log("Server funcionando")
})