const {Schema, model} = require('mongoose');

const user = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    resetToken: {
        type: String,
    },
    resetTokenExp: {
        type: Date,
    },
})


module.exports = model('User', user);