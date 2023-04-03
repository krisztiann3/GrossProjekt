const router = require("express").Router();
const {shirt,shirtId,jean,jeanId,hoodie,hoodieId} = require("./product.controller")

router.post("/polok",shirt)
router.post("/polok/:id",shirtId)
router.post("/nadragok",jean)
router.post("/nadragok/:id",jeanId)
router.post("/puloverek",hoodie)
router.post("/puloverek/:id",hoodieId)

module.exports = router;