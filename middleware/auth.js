//Checking if user is logged in, if no - redirecting him to log in page
module.exports = function (req, res, next) {
    if(!req.session.isAuthenticated) {
        return res.redirect('/#login');
    }
    next();
}