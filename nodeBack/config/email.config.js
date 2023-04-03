const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreplygrosskidz1@gmail.com',            //két faktoros auth
        pass: 'tujqowkfhrdyulse'
    }
});

module.exports = {transporter}