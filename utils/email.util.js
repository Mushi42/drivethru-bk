const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
var sgTransport = require('nodemailer-sendgrid-transport');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.email.split('@')[0];
        this.from = `aBing <${process.env.EMAIL_FROM}>`;
        if (user.password) {
            this.password = user.password;
        }
    }

    newTransport() {

        var options = {
            auth: {
                api_key: process.env.SENDGRID_API_KEY
            }
        }

        // return nodemailer.createTransport(sgTransport(options));

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    // Send the actual email
    async send(template, subject) {
        // 1) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            password: this.password,
            subject
        });

        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        };

        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the aBing Family!');
    }

    async sendPasswordReset() {
        await this.send(
            'passwordReset',
            'Your password reset! Please changed it in while time.'
        );
    }
};
