const express = require("express");
const { json } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const session = require('express-session')

const jwt = require('./SRC/helpers/jwt');
const errorHandler = require('./SRC/helpers/error-handler');
const { Database } = require('./SRC/helpers/odbc')
const { connectionString } = require('./SRC/helpers/odbc')
const { login } = require('./SRC/helpers/login')

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(json());
app.use(cors());
app.use(morgan("dev"));
//app.use(jwt())
app.use(session({secret: process.env.SES_SECRET, resave: true, saveUninitialized: true}))

//Routes
app.get('/', (req, res) => {
  res.send('Welcome to IBM i NodeJS Template')
})

app.post('/login', login )

app.use('/example', require('./SRC/pages/Example/routes'))

// global error handler
app.use(errorHandler)


//start NodeJS
Database.connect(connectionString).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});  