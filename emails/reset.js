const keys = require("../keys/keys");
module.exports = function(email, username, token) {
    return {
        to: email,
        from: keys.email_from,
        subject: 'Request to change password',
        html: `
        <h1>Hello ${username}!</h1>
        <h2>You requested password change on our website!</h2>
        <h4>This email is valid for 1 hour.</h4>
        <p>To change your password press on the link:</p> 
        <a href="${keys.own_url}/newPass/${token}">Reset Password</a>
        <hr/>
        <p>Don't worry, your email and data will be erased from MongoDB shortly after you check out the project! It's made for safery of your email address, so no spam will get there.</p>
        `
    }
}