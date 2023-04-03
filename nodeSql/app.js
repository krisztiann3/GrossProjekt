const cors = require('cors');
const express = require('express');
const app = express();
const useAuth = require("./api/auth/auth.route")
//hivatkozok az útvonalakra

try {
    app.use(cors())     //hostokkal való kommunikáció
    app.use(express.json)

    app.use('/auth',useAuth)
    // app.use('/esemenyek')
    // app.use('/vasarlas')

    app.listen(8081,() =>{console.log("Megy a szerver")});
} catch (error) {
    console.log('ERROR')
}