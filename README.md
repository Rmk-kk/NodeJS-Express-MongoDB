# NodeJS-Express-MongoDB
Portfolio project. Simple log in/ registration window with connection to Mongo. 

## Quick setup

### In terminal:

```npm i```

#### Will install node packages and dependencies.

```node .\index.js```

#### Will normally start server without nodemon on localhost 3000

```npm run dev```

#### Will start server with nodemon on localhost port 3000

## Quick description

This simple project is made of 3 parts, Node.js, MongoDB and HandleBars + CSS. 
I used `bcrypt.js` for hashing password, `csurf` CSRF tokens for input data protection. 
Login platform is connected to by demo database on Mongo. 
Session storage is made with `express-session` packet, and `connect-mongodb-session` is keeping sessions on database.
