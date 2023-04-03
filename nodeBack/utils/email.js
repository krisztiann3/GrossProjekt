const { transporter } = require('../config/email.config')
const pdfDocument = require('pdfkit');
const fs = require('fs');
const { text } = require('pdfkit');


async function emailSend() {

    var mailOptions = {
        from: 'noreplygrosskidz1@gmail.com',            //email küldés
        to: email,
        subject: 'No-reply rendelés',
        text: 'Rendelését fogadtuk, csomagja állapotának változásáról értesítjük.',
        attachments: [
            {   // file on disk as an attachment
                filename: 'szamla.pdf',
                path: `./temp/pdf/${pfdId}.pdf`
            }],
    }

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
    })
}

module.exports = { emailSend };