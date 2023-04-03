require('dotenv').config()
const jwt = require('jsonwebtoken');
const {emailSend} = require("../../utils/email");
const {Invoice} = require("../../utils/pdf");

async function vasarlas(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.secret);
    const { kosar } = req.body;
    const pfdId = Math.floor((1 + Math.random()) * 0x100000000)
    .toString(16)
    .substring(1);
    Invoice(kosar,pfdId)
    
    res.send('Email elküldve: ');
}

module.exports = {vasarlas};
