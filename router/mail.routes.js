const express = require("express");
const nodemailer = require("nodemailer");
const { protectRoutes, adminOnly } = require('../middleware');
const { User } = require('../models');

const router = express.Router();

router.post("/sendMail", async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'drivethru.pk@gmail.com',
            pass: 'aorntzlgmzhyojuw',
        },
    });


    let info = await transporter.sendMail({
        from: 'drivethru.pk@gmail.com',
        to: 'aqibijaz3@gmail.com',
        subject: req.body.subject,
        text: `Name : ${req.body.name}\nContact : ${req.body.phone}\nEmail : ${req.body.email}\nDescription :  ${req.body.description}`
    });

    res.send(info)
});
router.post("/counselling_session", protectRoutes, async (req, res) => {

    const { user } = req

    const userFound = await User.findOne({ _id: user.userId})

    if (!userFound) res.sendStatus(401)
    let testAccount = await nodemailer.createTestAccount();


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'drivethru.pk@gmail.com',
            pass: 'aorntzlgmzhyojuw',
        },
    });


    let info = await transporter.sendMail({
        from: 'drivethru.pk@gmail.com',
        to: 'aqibijaz3@gmail.com',
        subject: "Book Counselling Session",
        text: `Email : ${userFound.email}\nWhat help you ? : ${req.body.wantHelp}\nReason : ${req.body.reason}`
    });

    res.send("Email Sent")
});
router.post("/preference", protectRoutes, async (req, res) => {

    const { user, body } = req

    console.log('body', String(body.univerityList))

    const userFound = await User.findOne({ _id: user.userId})

    if (!userFound) res.sendStatus(401)
    let testAccount = await nodemailer.createTestAccount();


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'drivethru.pk@gmail.com',
            pass: 'aorntzlgmzhyojuw',
        },
    });


    let info = await transporter.sendMail({
        from: 'drivethru.pk@gmail.com',
        to: 'aqibijaz3@gmail.com',
        subject: "Student University Preference",
        text: `Email : ${userFound.email}\nUniversity Preference ? : ${String(body.univerityList)}`
    });

    res.send("Email Sent")
});

module.exports = router