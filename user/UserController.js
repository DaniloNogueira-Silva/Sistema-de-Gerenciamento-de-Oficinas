const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');
const adminAuth = require("../middlewares/adminAuth");


//MOSTRAR

router.get("/admin/users", adminAuth , (req, res)=>{

    User.findAll().then(users =>{
        res.render("admin/users/index", {users: users});
    });
});


//CRIR
router.get("/admin/users/create", (req, res)=>{
    res.render("admin/users/create")
})

//NÃO SALVAR A SENHA LITERAL NO BANCO DE DADOS
//USAR O HASH!!!

router.post("/users/create", (req, res)=>{
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password


    //Para conferir se o email já está cadastrado
    User.findOne({where:{ email:email}}).then(user =>{
        if(user == undefined){

            
            //SALVAR SENHAS DA FORMA CORRETA E SEGURA
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                name: name,
                email: email,
                password: hash

            }).then(()=>{
                alert("a")
            }).catch((err) =>{
                res.redirect("/")
            })

        }else{
            res.redirect("/admin/users/create")
        }
    })

})


//LOGAR

router.get("/", (req, res)=>{
    res.render("index")
})

//DELETAR
router.post("/users/delete",adminAuth , (req, res)=>{  //botão deletar
    var id = req.body.id;
    if(id != undefined){

        if(!isNaN(id)){

            User.destroy({ //vai ser destruir um usuário se o id for igual ao id recebido
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/users");
            })

        }else{ //se o id não for um número
            res.redirect("/admin/users");
        }
    }else{ //null
        res.redirect("/admin/users");

    }
})

router.post("/authenticate", (req, res)=>{
    var email = req.body.email
    var password = req.body.password

    User.findOne({
        where: {
            email: email
        }
    }).then(user =>{
        if(user != undefined){
            //valdar a senha

            var correct= bcrypt.compareSync(password, user.password);

            if(correct){
                req.session.user = {
                    id: user.id,
                    email: email.id
                }

                res.redirect("/central") //REDIRECIONA PARA A CENTRAL QUANDO LOGAR
                    
            }else{
                res.redirect("/")
            }
        }else{
            res.redirect("/")
        }
    })
})

//EDIÇÃO:


router.get("/admin/users/edit/:id", (req,res)=>{

    var id = req.params.id;

    User.findByPk(id).then(user =>{
        if(user != undefined){

            res.render("admin/users/edit", {user: user})

        }else{
            res.redirect("/admin/users")
        }
    }).catch(erro =>{
        res.redirect("/admin/users")
    })
});


router.post("/users/update", (req, res)=>{
    var id= req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt);


    User.update({name: name, email: email, password: hash}, {
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/users")
    })
});

//LOGOUT

router.get("/logout", (req,res)=>{
    req.session.user = undefined
    res.redirect("/")
})



module.exports = router