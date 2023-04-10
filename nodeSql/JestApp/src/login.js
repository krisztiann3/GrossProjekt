const express = require('express');
const app = express();

app.post('/login', async (req, res) => {
    const { nev, jelszo } = req.body

    if (!nev || !jelszo) {
        return res.status(400).json({
            message: 'hibás adatok'
        });
    }
    try {
        const result = await query("SELECT * FROM bejelentkezes WHERE felhasznalo = ?", [nev])
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
    }}
)