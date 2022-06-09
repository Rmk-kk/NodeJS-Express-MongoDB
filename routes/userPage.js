const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth');

//auth for testing if user is logged in
router.get('/', auth, (req, res) => {
    res.render('homepage', {
        title: 'Home Page'
    })
});

module.exports = router;
