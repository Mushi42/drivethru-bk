const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/sendMail", async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'musharaf42@gmail.com',
            pass: 'xrugxdytaahohrqt',
        },
    });


    let info = await transporter.sendMail({
        from: 'musharaf42@gmail.com',
        to: 'aqibijaz3@gmail.com',
        subject: req.body.subject,
        text: `Name : ${req.body.name}\nContact : ${req.body.phone}\nEmail : ${req.body.email}\nDescription :  ${req.body.description}`
    });

    res.send(info)
});

module.exports = router