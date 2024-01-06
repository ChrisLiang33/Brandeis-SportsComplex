const express = require("express");
const layouts = require("express-ejs-layouts");
const errorController = require("./routes/errorController");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const connectFlash = require("connect-flash");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const { check, validationResult, body } = require('express-validator');
const passport = require("passport");
const app = express();
const User=require("./models/user")
//connect to database
mongoose.connect("mongodb://localhost:27017/sports_center");
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to mongodb!");
});

//create the adminstrator
const createAdmin=async () => {
  try {
    const admin = await User.findOne({ email: "d@12g.com" });

    if (!admin) {
      const newAdmin = await User.register({
        name: "theonlytruegod",
        email: "d@12g.com",
        password:"0",
        isAdmin: true,
      },"0");
      console.log("admin created");
    } else{
      console.log("admin already here");
    }
  } catch (err) {
    console.error("Error:", err);
  } 
}
createAdmin();

// view engine setup
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);
app.use(express.json());
app.use(body().trim());
app.use(express.urlencoded({extended:false}));
app.set("port", process.env.PORT || 3000);

// functionality setup
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
app.use(cookieParser("secret-pascode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 40000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});



// routes
app.use("/", indexRouter);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// listen on provided prot, on all network interfaces

app.listen(app.get("port"), () => {
  console.log(`Server is running at http://localhost:${app.get("port")}`);
});