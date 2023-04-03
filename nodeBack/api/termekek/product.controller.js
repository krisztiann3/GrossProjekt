require('dotenv').config()
const { shirtDb, shirtIdDb, jeanDb, jeanIdDb, hoodieDb, hoodieIdDb } = require('./products.service');


async function shirt(req, res) {
    try {
        const result = await shirtDb()
        res.status(200).json({
            status: 'succes', termekek: result
        })
    } catch (error) {
        return res.status(400).json({
            message: 'hibás adatok'
        });
    }
}

async function shirtId(req, res) {
    try {
        const id = req.params.id
        const result = await shirtIdDb(id)
        res.status(200).json({
            status: 'succes', termekek: result
        })
    } catch (error) {
        return res.status(400).json({
            message: 'hibás adatok'
        });
    }
}

async function jean(req, res) {
    try {
        const result = await jeanDb()
        res.status(200).json({
            status: 'succes', termekek: result
        })
    } catch (error) {
        return res.status(400).json({
            message: 'hibás adatok'
        });
    }
}

async function jeanId(req, res) {
    try {
        const id = req.params.id
        const result = await jeanIdDb(id)
        res.status(200).json({
            status: 'succes', termekek: result
        })

    } catch (error) {
        return res.status(400).json({
            message: 'hibás adatok'
        });
    }
}

async function hoodie(req, res) {
    try {
        const result = await hoodieDb()
        res.status(200).json({
            status: 'succes', termekek: result
        })
    } catch (error) {
        return res.status(400).json({
            message: 'hibás adatok'
        });
    }
}

async function hoodieId(req, res) {
    try {
        const id = req.params.id
        const result = await hoodieIdDb(id)
        res.status(200).json({
            status: 'succes', termekek: result
        })
    } catch (error) {
        return res.status(400).json({
            message: 'hibás adatok'
        });
    }
}

module.exports = { shirt, shirtId, jean, jeanId, hoodie, hoodieId }