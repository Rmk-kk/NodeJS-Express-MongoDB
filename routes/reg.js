const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
const {nodemailer_api} = require("../keys/keys");
const regEmail = require('../emails/registration');

const transport = nodemailer.createTransport(sendgrid({
    auth: { api_key: nodemailer_api },
}))

//GET request to registration page
router.get('/', (req, res) => {
    res.render('registration', {
        title: 'New User',
        regError: req.flash('regError'),
    })
});

//User registration
router.post('/reg', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const userTryingToRegister = await User.findOne({ username });
        //if user exist => stay on reg page + error, else => to login page
        if(userTryingToRegister){
            req.flash('regError', 'Username is taken'); // If username exist => show error
            res.redirect('/registration'); //stay on same page
        } else {
            const passHash = await bcrypt.hash( password, 5); //hash pass
            const user = new User({ username, password: passHash, email }); //create new user
            await user.save(); //send to DB
            res.redirect('/#succesfull');
            await transport.sendMail(regEmail(email, username));
        }
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;