const cors = require('cors');
const express = require('express');
const app = express();
const useAuth = require("./api/auth/auth.route")
const products = require("./api/termekek/product.route")
const vasarlas = require("./api/vasarlas/shopping.route")
//hivatkozok az útvonalakra

try {
    app.use(cors())             //hostokkal való kommunikáció
    app.use(express.json())

    app.use('/auth',useAuth)
    // app.use('/esemenyek')
    app.use('/termekek',products)
    app.use('/vasarlas',vasarlas)

} catch (error) {
    console.log('ERROR')
}
app.listen(8080,() =>{console.log("Megy a szerver")});