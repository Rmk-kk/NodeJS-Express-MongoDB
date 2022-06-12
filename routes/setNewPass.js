const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

//Reset pass page GET ( LINK FROM EMAIL )
//AUTO REDIRECT TO INDEX PAGE!!!!!!!! FIX IT ASAP!! // FIXED
//CSS STYLES NOT WORKING
router.get(`/:token`, async (req, res) => {
    console.log(req.params.token);
    if(!req.params.token) {
        return res.redirect('/');
    }
    try {
        const user = await User.findOne({
            resetToken : req.params.token,
            resetTokenExp : { $gt: Date.now() }, //If reset token expired, $gt = greater
        })
        if(!user){
            console.log(`No user found`);
            return res.redirect('/');
        } else {
            res.render('newpassword', {
                title: 'Set new password',
                passError: req.flash('passError'),
                userId: user._id.toString(),
                token: req.params.token,
            })
        }

    } catch (err) {
        console.error(err);
    }

})

//Reset pass POST
router.post('/setNewPassword', async (req, res) => {
    try {
        const userForNewPass = await User.findOne({
            _id: req.body.userId,
            resetToken: req.body.token,
            resetTokenExp: {$gt: Date.now()},
        })
        if(userForNewPass){
            userForNewPass.password = await bcrypt.hash(req.body.password, 5);
            userForNewPass.resetToken = undefined;
            userForNewPass.resetTokenExp = undefined;
            await userForNewPass.save();
            res.redirect('/');
            req.flash('success', 'Password was successfully changed!');
        } else {
            req.flash('emailError', 'Link has expired.')
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
    }
})

module.exports = router;