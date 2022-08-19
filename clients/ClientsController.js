const express = require("express");
const router = express.Router();
const Client = require("./Client");
const adminAuth = require("../middlewares/adminAuth");


router.get("/admin/clients/new",adminAuth , (req, res)=>{
    res.render("admin/clients/new");
});

//CRIAR
router.post("/clients/save",adminAuth , (req,res)=>{
    let name = req.body.name;
    let age = req.body.age;
    let cpf = req.body.cpf;
    let adress = req.body.adress;
    let phone = req.body.phone;

    if(name != undefined && age != undefined && cpf != undefined && adress != undefined && phone != undefined ){

        Client.create({
            name: name,
            age: age,
            cpf: cpf,
            adress: adress,
            phone: phone
        }).then(()=>{
            res.redirect("/admin/clients")
        })
    }else{
        res.redirect("/admin/clients/new")
    }

})

//LER
router.get("/admin/clients",adminAuth , (req, res)=>{
    Client.findAll().then(clients =>{
        res.render("admin/clients/index", {
            clients: clients
        })
    })
})

//DELETAR
router.post("/clients/delete",adminAuth , (req, res)=>{  //botão deletar
    var id = req.body.id;
    if(id != undefined){

        if(!isNaN(id)){

            Client.destroy({ //vai ser destruir uma categoria se o id for igual ao id recebido
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/clients");
            })

        }else{ //se o id não for um número
            res.redirect("/admin/clients");
        }
    }else{ //null
        res.redirect("/admin/cients");

    }
})

//EDITAR
router.get("/admin/clients/edit/:id",adminAuth , (req, res)=>{

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/clients");
    }


    Client.findByPk(id).then(clients =>{ //método de pesquisar pelo id, é mais rápido
        if(clients != undefined){
            //caso esteja tudo certo
            res.render("admin/clients/edit", {clients: clients});

        }else{
            res.redirect("/admin/clients")
        }
    }).catch(erro =>{
        res.redirect("/admin/clients")
    }) 
});

router.post("/clients/update",adminAuth , (req, res)=>{
    var id = req.body.id;
    let name = req.body.name;
    let age = req.body.age;
    let cpf = req.body.cpf;
    let adress = req.body.adress;
    let phone = req.body.phone;

    Client.update({name: name, age: age, cpf: cpf, adress: adress, phone: phone }, {
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/clients")
    })
});

module.exports = router