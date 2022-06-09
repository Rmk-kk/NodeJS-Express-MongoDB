const express = require('express'); //express js
const mongoose = require("mongoose"); //mongo DB
const homeRoute = require('./routes/auth'); // log in page routes
const regRoute = require('./routes/reg'); // registration page routes
const userRoute = require('./routes/userPage'); //secret page routes
const path = require('path'); //path module
const handlebars = require('express-handlebars'); // handlebars
const keys = require('./keys/keys');//Importing keys ( URI etc.)
//Middlewares
const session = require('express-session'); // session storage
const middleWear = require('./middleware/variables'); // auth session
const csurf = require('csurf'); //Middleware for app, POST requests protection
const flash = require('connect-flash');//Middleware for errors
const MongoStorage = require('connect-mongodb-session')(session); // mongoDV session storage



const app = express();

//Handlebars
const hbs = handlebars.create({
    defaultLayout : 'main',
    extname : 'hbs',
});
//Session storage
const storage = new MongoStorage({
    collection: 'session',
    uri : keys.MongoDB_URI,
})

app.use(express.static(path.join(__dirname, 'views/')));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: keys.session_secret,
    resave: false,
    saveUninitialized: false,
    store: storage,
}))
app.use(csurf());
app.use(flash());
//Session
app.use(middleWear);

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');


app.use('/', homeRoute);
app.use('/registration', regRoute);
app.use('/homepage', userRoute);

const PORT = process.env.PORT || 3000;

(async function dataStart() {
    try {
        await mongoose.connect(keys.MongoDB_URI, { useNewUrlParser : true});
        app.listen(PORT, () => {
            console.log("Connected successfully");
            console.log(`Server is running on PORT: ${PORT} `);
        })
    }
    catch (err) {
        console.log(err);
    }
})();
