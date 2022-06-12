const {email_from} = require('../keys/keys');
module.exports = function (email, username) {
    return {
        to: email,
        from: email_from,
        subject: 'Successful registration',
        html: `
        <h1>Hello ${username.toUpperCase()}!</h1>
        <h2>Thank you for registration!</h2>
        <p>Don't worry, your email and data will be erased from MongoDB shortly after you check out the project! It's made for safery of your email address, so no spam will get there.</p>
        `
    }
}