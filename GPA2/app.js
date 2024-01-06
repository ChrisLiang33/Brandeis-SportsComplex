const expressValidator = require('express-validator')
const passport = require('passport')
const User = require('./models/user')
const router = require('./routes/index')
const mongoose = require('mongoose')
const express = require('express')
const methodOverride = require('method-override')
const layouts = require('express-ejs-layouts')
const connectFlash = require('connect-flash')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')


//basic setup
mongoose.connect('mongodb://localhost:27017/gosman', {
  family: 4,
})
const app = express()
app.use(methodOverride('_method'))
app.use(layouts)
app.use(expressValidator())
app.use(cookieParser('secret-passcode'))
app.use(
  expressSession({
    secret: 'secret_passcode',
    cookie: {
      maxAge: 40000,
    },
    resave: false,
    saveUninitialized: false,
  }),
)
app.use(connectFlash())
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'ejs')
const db = mongoose.connection
//static files
app.use(express.static('public'))

db.once('open', () => {
  console.log('Successfully connected to mongodb!')
})

//autentification 
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash()
  res.locals.loggedIn = req.isAuthenticated()
  res.locals.currentUser = req.user
  next()
})

app.use('/', router)

app.listen(3000, () => {
  console.log('application is running')
})


