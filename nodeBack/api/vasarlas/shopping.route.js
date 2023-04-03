const router = require("express").Router();
const {vasarlas} = require("./shopping.controller")


router.post("/",vasarlas)
module.exports = router;