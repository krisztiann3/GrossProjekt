require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios')
const mySql = require('mysql');
const cors = require('cors');
const util = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const pdfDocument = require('pdfkit');
const fs = require('fs');
const { text } = require('pdfkit');


const db = mySql.createPool({
    host: process.env.db_hostname,
    user: process.env.db_user,
    passwrod: process.env.db_password,
    database: process.env.db_database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = db;

// Cron időzítő és részei
const task = cron.schedule('1 * * * *', () => {
    console.log("Tokened egy órán át él")
    try {
        db.query("DELETE FROM `blacklist` WHERE exp_date <  DATE_SUB(NOW(),INTERVAL 1 HOUR)", (req, results) => {
            if (err) {
                console.log(err)
            } else {
                console.log("A lejárt elemek törölve lettek.")
            }
        })
    } catch (error) {
        console.log(error)
        task.end()
        console.log('Megállítva')
    }
});
task.start();
const app = express();
app.use(bodyParser.json());
app.use(cors());

const query = util.promisify(db.query).bind(db);



// Tokenek kezelése
async function auth(req, res, next) {
    const token = req.headers.authorization
    try {
        const result = await query('SELECT token FROM blacklist WHERE token = ?', [token])
        console.log(result)
        if (!result.length > 0) {
            const decode = jwt.verify(token, process.env.secret)
            req.user = decode
            next()
        } else {
            return res.status(401).json({
                error: 'token lejárt'
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

module.exports = auth;

// Kijelentkezés elérési út
app.post('/logout', auth, async (req, res) => {
    const token = req.headers.authorization
    try {
        const result = await query('INSERT INTO blacklist (token) VALUE (?)', [token])
        res.status(200).json({
            status: 'succes', termekek: result
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
})

// termékek elérési út
app.get('/termekek/:termekek', async (req, res) => {
    const termekek = req.params.termekek
    try {
        if (termekek == 'polok') {
            const result = await query('SELECT * FROM polok')
            res.status(200).json({
                status: 'succes', termekek: result
            })
        }
        else if (termekek == 'puloverek') {
            const result = await query('SELECT * FROM puloverek')
            res.status(200).json({
                status: 'succes', termekek: result
            })
        } else if (termekek == 'nadragok') {
            const result = await query('SELECT * FROM nadragok')
            res.status(200).json({
                status: 'succes', termekek: result
            })
        }
        else {
            res.status(400).json({
                error: 'nincs ilyen termék'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
})

app.post('/termekek/:termekek', async (req, res) => {
    const termekek = req.params.termekek
    const {
        kep,
        megnevezes,
        meret,
        osszeg
    } = req.body

    if (!kep || !megnevezes || !meret || !osszeg) {
        res.status(401).json({
            error: 'Hibás adatok'
        });
    }
    try {
        await query('INSERT INTO ' + termekek + ' (`kep`, `megnevezes`, `meret`, `osszeg`) VALUES (?,?,?,?)', [kep, megnevezes, meret, osszeg])
        res.status(201).json({
            status: 'sikeres feltöltés'
        })
    } catch (error) {
        res.status(401).json({
            error: error
        });
    }
})

//termék elérési út id alapján
app.get('/termekek/:termekek/:id', async (req, res) => {
    const termekek = req.params.termekek
    const id = req.params.id
    try {
        if (termekek == 'polok') {
            const result = await query('SELECT * FROM polok WHERE id=?', [id])
            res.status(200).json({
                status: 'succes', termekek: result
            })
        }
        else if (termekek == 'puloverek') {
            const result = await query('SELECT * FROM puloverek WHERE id=?', [id])
            res.status(200).json({
                status: 'succes', termekek: result
            })
        } else if (termekek == 'nadragok') {
            const result = await query('SELECT * FROM nadragok WHERE id=?', [id])
            res.status(200).json({
                status: 'succes', termekek: result
            })
        }
        else {
            res.status(400).json({
                error: 'nincs ilyen termék'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
})

// regisztráció
app.post('/register', async (req, res) => {
    const { felhasznalonev, emailcim, jelszo, jelszo2 } = req.body

    if (!felhasznalonev || !emailcim || !jelszo) {
        return res.status(400).json({
            error: 'hiányzó adatok'
        });
    }
    if (jelszo != jelszo2) {
        return res.status(400).json({
            error: 'A két jelszó nem egyezik'
        });
    }
    try {
        const users = await query("SELECT email, felhasznalo FROM bejelentkezes WHERE email = ? OR felhasznalo = ?", [emailcim, felhasznalonev])
        if (users.length > 0) {
            return res.status(400).json({
                error: 'foglalt'
            })
        }else if(users.length <= 0){

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(jelszo, salt)

        const result = await query('INSERT INTO bejelentkezes (felhasznalo, email, jelszo) VALUES (?,?,?)', [felhasznalonev, emailcim, hash])
        return res.status(201).json({
            status: 'succesful'
        })}
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
})

//emailkülés
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreplygrosskidz1@gmail.com',
        pass: 'tujqowkfhrdyulse'
    }
});

//vásárlási rész
app.post('/vasarlas', auth, async (req, res) => {
    const doc = new pdfDocument();
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.secret);
    const email = decode.email;
    const { kosar } = req.body
    const pfdId = Math.floor((1 + Math.random()) * 0x100000000)
        .toString(16)
        .substring(1);



    //email-pdf rész
    var mailOptions = {
        from: 'noreplygrosskidz1@gmail.com',
        to: email,
        subject: 'No-reply rendelés',
        text: 'Rendelését fogadtuk, csomagja állapotának változásáról értesítjük.',
        attachments: [
            {   // file on disk as an attachment
                filename: 'szamla.pdf',
                path: `./temp/pdf/${pfdId}.pdf`
            }],
    }



    // pdf létrehozása
    doc.pipe(fs.createWriteStream(`./temp/pdf/${pfdId}.pdf`))

    // Hozzáadott elemek formázása
    doc.fontSize(25)
        .text('GrossKidz számlája!', 120, 120)
        .underline(120, 120, 360, 27, { color: '#000000' })


    for (let i = 0; i < kosar.length; i++) {
        doc.scale(0.6)

            .text('Termék megnevezése:', 220 + i, 520 + i, 120 + i)
            .text(kosar[i].megnevezes)
            .text('Termék mennyisége:')
            .text(kosar[i].mennyiseg)
            .text('Összege:')
            .text(kosar[i].osszeg * kosar[i].mennyiseg + 'Ft')
            .restore();
    }


    doc.end();

    //email küldés pdf-el, pdf törlés
    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            console.log(error);
        } else {
            try {
                fs.unlink(`./temp/pdf/${pfdId}.pdf`, function (err) {
                    console.log('Sikeres törlés');
                })
            } catch (error) {
                console.log(error)
            }
            res.send('Email elküldve: ' + info.response);
        }
    });
})

//hitelesítés
app.get('/verify',auth,  async (req, res) => {
    res.status(200).json({
        status: "ok"
    })
})

// bejelentkezés elérési út
app.post('/login', async (req, res) => {
    const { nev, jelszo } = req.body

    if (!nev || !jelszo) {
        return res.status(400).json({
            message: 'Hiányos adatok'
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

module.exports = app
app.listen(8080, () => { console.log("Megy a szerver") });