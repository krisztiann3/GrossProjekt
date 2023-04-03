const router = require("express").Router(); 
const {userlogin,verify,register,logout} = require("./auth.controller");


router.post("/login",userlogin)
router.post("/verify",verify)
router.post("/",register)
router.post("/logout",logout)

module.exports = router;