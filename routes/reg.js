const { Router } = require('express');
const router = Router();
const User = require('../views/models/user');
const bcrypt = require('bcryptjs');


//GET request to registration page
router.get('/', (req, res) => {
    res.render('registration', {
        title: 'New User',
        regError: req.flash('regError'),
    })
});

//User registration
router.post('/reg', async (req, res) => {
    console.log(req.body);
    try {
        const { username, password } = req.body;
        console.log({username, password});
        const userTryingToRegister = await User.findOne({ username });
        //if user exist => stay on reg page + error, else => to login page
        if(userTryingToRegister){
            req.flash('regError', 'Username is taken'); // If username exist => show error
            res.redirect('/registration'); //stay on same page
        } else {
            const passHash = await bcrypt.hash( password, 5); //hash pass
            const user = new User({ username, password: passHash }); //create new user
            await user.save(); //send to DB
            res.redirect('/#succesfull')
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;