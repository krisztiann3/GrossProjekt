const login = require("./index")
const cors = require('cors');
const express = require('express');
const app = express();
// const useAuth = require("./api/auth/auth.route")
const port = 8080;

//hivatkozok az útvonalakra

try {
    app.use(cors())     //hostokkal való kommunikáció
    app.use(express.json())

    // app.use('/auth', useAuth)
    // app.use('/login', login);

    // app.use('/vasarlas')

    app.listen(port, () => {
        console.log(`App is running on port ${port}`);
    });
} catch (error) {
    console.log('ERROR')
}