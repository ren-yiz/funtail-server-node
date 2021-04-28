const express = require('express')
const app = express()
const mongoose = require("mongoose");
require('dotenv').config()
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(res => console.log("Connected to DB"))
.catch(err => console.log(err))

const session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))

mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true, useUnifiedTopology: true});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
      'Content-Type, X-Requested-With, Origin');
  res.header('Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));

require("./controllers/users-controller")(app)
require("./controllers/drinks-controller")(app)
require("./controllers/reviews-controller")(app)
require("./controllers/admins-controller")(app)

app.listen(process.env.PORT||4000)