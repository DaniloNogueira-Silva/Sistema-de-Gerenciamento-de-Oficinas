const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth");



router.get("/central", adminAuth, (req,res)=>{
    res.render("admin/central/central")
})

module.exports = router