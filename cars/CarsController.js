const express = require("express");
const router = express.Router();
const Client = require("../clients/Client");
const Car = require("./Car");
const adminAuth = require("../middlewares/adminAuth");

//pagina inicial

router.get("/admin/cars",adminAuth ,(req, res)=>{
    Car.findAll({
        include: [{model: Client}] //esta incluindo o model category
    }).then(cars =>{
        res.render("admin/cars/index", {cars: cars})
    })
})

//CRIAR
router.get("/admin/cars/new", adminAuth , (req, res)=>{
    Client.findAll().then(clients =>{
        res.render("admin/cars/new", {clients: clients})
    })
})

router.post("/cars/save", adminAuth , (req, res)=>{
    var marca = req.body.marca;
    var modelo = req.body.modelo;
    var ano = req.body.ano;
    var cor = req.body.cor;
    var placa = req.body.placa;
    var client = req.body.client

    if(marca != undefined && modelo != undefined && ano != undefined && cor != undefined){
        Car.create({
            marca: marca,
            modelo: modelo,
            ano: ano,
            cor: cor,
            placa: placa,
            clientId: client
    
        }).then(()=>{
            res.redirect("/admin/cars")
        });
    }
});

//DELETAR
router.post("/cars/delete", adminAuth , (req, res)=>{  //botão deletar
    var id = req.body.id;
    if(id != undefined){

        if(!isNaN(id)){

            Car.destroy({ //vai ser destruir um artigo se o id for igual ao id recebido
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/cars");
            })

        }else{ //se o id não for um número
            res.redirect("/admin/cars");
        }
    }else{ //null
        res.redirect("/admin/cars");

    }
})

//EDITAR
router.get("/admin/cars/edit/:id", adminAuth, (req, res)=>{
    
    var id = req.params.id

    Car.findByPk(id).then(cars =>{
        if(cars != undefined){

            Client.findAll().then(clients =>{
                res.render("admin/cars/edit", {clients: clients, cars: cars});

            });

        }else{
            res.redirect("/admin/cars")
        }
    }).catch(erro =>{
        res.redirect("/admin/cars")
    })
});

router.post("/cars/update", adminAuth, (req, res)=>{
    
    var id = req.body.id;
    var marca = req.body.marca;
    var modelo = req.body.modelo;
    var ano = req.body.ano;
    var cor = req.body.cor;
    var placa = req.body.placa;
    var client = req.body.client

    Car.update({ 

        marca: marca,
        modelo: modelo,
        ano: ano,
        cor: cor,
        placa: placa,
        clientId: client,

    }, {
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/cars")
    }).catch(err =>{
        res.redirect("/central")
    })
})



module.exports = router