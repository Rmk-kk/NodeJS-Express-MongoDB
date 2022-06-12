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
#### v1.0
This simple project is made of 3 parts, Node.js, MongoDB and HandleBars + CSS. 
I used `bcrypt.js` for hashing password, `csurf` CSRF tokens for input data protection. 
Login platform is connected to by demo database on Mongo. 
Session storage is made with `express-session` packet, and `connect-mongodb-session` is keeping sessions on database.

#### v1.1
I added confirmations via email, and password recovery via email link. Link is alive for 1 hour, until the token is not expired. On password recovery request token is generated for the user. 
For error's on page('user not found, wrong email, wrong pass etc.) I used `flash` - `connect-flash` package. 
For emails i used `nodemailer`, and as service `sendgrid` - `send-grid-transport`
