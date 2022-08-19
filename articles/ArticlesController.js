const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth");
const Article = require("./Article");

router.get("/admin/articles", adminAuth,(req, res)=>{
    Article.findAll().then(articles =>{
        res.render("admin/articles/index", {articles: articles})
    })
});

router.get("/admin/articles/new", adminAuth, (req, res)=>{
    res.render("admin/articles/new")
})

router.post("/articles/save", (req, res)=>{
    var client = req.body.client
    var car = req.body.car
    var body = req.body.body

    Article.create({
        car: car,
        client: client,
        body: body
    }).then(()=>{
        res.redirect("/admin/articles")
    })
})

//DELETAR
router.post("/articles/delete", adminAuth , (req, res)=>{  //botão deletar
    var id = req.body.id;
    if(id != undefined){

        if(!isNaN(id)){

            Article.destroy({ //vai ser destruir um artigo se o id for igual ao id recebido
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/articles");
            })

        }else{ //se o id não for um número
            res.redirect("/admin/articles");
        }
    }else{ //null
        res.redirect("/admin/articles");

    }
})

router.get("/articles/:id",adminAuth , (req, res)=>{
    var id = req.params.id
    Article.findOne({
        where: {
            id: id
        }
    }).then(article =>{
        if(article != undefined){
            res.render("admin/articles/articles", {article: article})
        }else{
            res.redirect("/admin/articles")
        }
    }).catch(err =>{
        res.redirect("/admin/articles")
    })
})


//EDITAR
router.get("/articles/edit/:id",adminAuth , (req, res)=>{

    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/articles");
    }


    Article.findByPk(id).then(article =>{ //método de pesquisar pelo id, é mais rápido
        if(article != undefined){
            //caso esteja tudo certo
            res.render("admin/articles/edit", {article: article});

        }else{
            res.redirect("/admin/articles")
        }
    }).catch(erro =>{
        res.redirect("/admin/articles")
    }) 
});

router.post("/articles/update",adminAuth , (req, res)=>{
    var id = req.body.id;
    let client = req.body.client;
    let car = req.body.car;
    let body= req.body.body;


    Article.update({client:client, car: car, body: body }, {
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/articles")
    }).catch(err =>{
        res.redirect("/admin/articles")
    })
});


module.exports = router