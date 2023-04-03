require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cron = require('node-cron');
const {userName,UserEmailGet,regist,ki} = require('./auth.service');

//ide ami történik(login stb)

async function userlogin(req, res) {
    try {
        const { nev, jelszo } = req.body

        if (!nev || !jelszo) {
            return res.status(400).json({
                message: 'hibás adatok'
            });
        }
        const result = await userName(nev)
        if (result.length > 0) {
            bcrypt.compare(jelszo, result[0].jelszo, function (err, ismatch) {
                if (ismatch) {
                    const payload = {
                        username: result[0].felhasznalo,
                        email: result[0].email
                    }
                    const options = {
                        expiresIn: '1h'
                    }
                    const secrets = process.env.secret
                    console.log("sikeres bejelentkezés")
                    jwt.sign(payload, secrets, options, (err, token) => {
                        if (err) {
                            return res.send(err)
                        } else {
                            return res.status(200).json({
                                status: 'succes', message: 'Sikeres bejelentkezés', token: token
                            })
                        }
                    })
                } else {
                    return res.json({
                        status: 'failure', message: 'Sikertelen bejelentkezés'
                    })
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

async function verify(req, res) {
    res.status(200).json({
        status: "Verify succes, status Ok"
    })
}

async function register(req, res) {

    const { felhasznalonev, emailcim, jelszo, jelszo2 } = req.body
    if (!felhasznalonev || !emailcim || !jelszo) {
        return res.status(400).json({
            error: 'Hiányzó adatok'
        });
    }
    if (jelszo != jelszo2) {
        return res.status(400).json({
            error: 'A két jelszó nem egyezik'
        });
    }
    try {
        const users = await UserEmailGet(emailcim, felhasznalonev)
        if (users.lenght > 0) {
            return res.status(400).json({
                error: 'foglalt'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(jelszo, salt)

        const result = await regist(felhasznalonev, emailcim, hash)
        return res.status(201).json({
            status: 'succesful'
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

async function logout(req, res) {
    const token = req.headers.authorization
    try {
        const result = await ki(token)
        res.status(200).json({
            status: 'succes', termekek: result,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}



module.exports = {userlogin,verify,register,logout};