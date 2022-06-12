const { Router } = require('express');
const router = Router();
const crypto = require('crypto');
const User = require('../models/user');
const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");
const {nodemailer_api} = require("../keys/keys");
const resetEmail = require('../emails/reset');

//Emails connection
const transport = nodemailer.createTransport(sendgrid({
    auth: { api_key: nodemailer_api },
}))

//pass reset request Page GET
router.get('/', async (req,res) => {
    res.render('resetpassword', {
        title: 'Set new password',
        emailError: req.flash('emailError'),
        successMsg: req.flash('successMsg'),
    })
})
//pass reset request page POST
router.post('/reset', (req, res) => {
    try {
        crypto.randomBytes(32, async(err, buffer) => {
            if(err) {
                req.flash('emailError', 'Something went wrong...')
                return res.redirect('/')
            }
            const token = buffer.toString('hex');
            const userResetPass = await User.findOne({
                email: req.body.email,
            });
            if(!userResetPass) {
                req.flash('emailError', "Can't find user with this email");
                res.redirect('/passwordRequest');
            } else {
                userResetPass.resetToken = token;
                userResetPass.resetTokenExp = Date.now() + 3600 * 1000;
                await userResetPass.save();
                await transport.sendMail(resetEmail(userResetPass.email, userResetPass.username, token));
                req.flash("successMsg", "Link was sent to your email!");
                res.redirect('/passwordRequest#success');
            }
        })
    } catch (e) {
        console.error(e);
    }
})

module.exports = router;