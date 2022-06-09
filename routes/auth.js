const { Router } = require('express');
const User  = require('../views/models/user');
const bcrypt = require('bcryptjs');
const router = Router();

//Default page ( log in )
router.get('/', (req, res) => {
    res.render('index', {
        title: 'NodeJS Project',
        loginError: req.flash('loginError'),
    })
})

//Logout button on secret to default page
router.get('/logout', (req, res) => {
    req.session.destroy(()=> {
        res.redirect('/#login');
    });
})

//Login POST request
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        //looking for user
        const userTryingToLog = await User.findOne({ username });
        //if user found => check pass
        if(userTryingToLog) {
            const correctPass = await bcrypt.compare(password, userTryingToLog.password);
            //if correct => send to secret
            if(correctPass) {
                req.session.user = userTryingToLog; //creating session for user
                req.session.isAuthenticated = true; //status to auth
                req.session.save(error => { //saving session
                    if(error) {
                        throw error
                    }
                    res.redirect('/homepage'); //allowing to new page
                })
            } else {
                //ADD REDIRECTION TO FORGOT PASSWORD PAGE
                req.flash('loginError', 'Wrong password'); //showing message of wrong pass
                // res.redirect('/registration#register');
                res.redirect('/#wrongpassword');
            }
        } else {
            //user doesn't exist, send to reg
            req.flash('loginError', "User doesn't exist"); //user does not exist
            res.redirect('/#userdoesntexist');
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;