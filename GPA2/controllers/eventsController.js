const Event = require("../models/event");
const User = require("../models/user");
const httpStatus = require("http-status-codes");

const getEventParams = (body) => {
  return {
    name: body.name,
    description: body.description,
    location: body.location,
    date: body.date,
  };
};

module.exports = {
  index: (req, res, next) => {
    Event.find({})
      .then((events) => {
        res.locals.events = events;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("events/index", { currentEvents: res.locals.events });
  },

  // && req.user.isAdmin
  new: (req, res, next) => {
    if (req.user) {
      res.render("events/new")
    } 
    else {
      req.flash("error", "You do not have permission to access this page.");
      res.redirect("/users/login");
    }
  },
  
  create: (req, res, next) => {
    if (req.skip) return next();
    const eventParams = getEventParams(req.body);
    Event.create(eventParams, (err, event) => {
      if (err) {
        console.error(`Error creating event: ${err.message}`);
        req.flash("error", `Failed to create event because: ${err.message}.`);
        res.locals.redirect = "/events/new";
        return next();
      }
      console.log(`Event ${event.name} created successfully!`);
      req.flash("success", `${event.name} created successfully!`);
      res.locals.redirect = "/events";
      return next();
    });
  },
  
  

  validate: (req, res, next) => {
    req.check("name", "Name cannot be empty").notEmpty();
    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/events/new";
        next();
      } else {
        next();
      }
    });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("users/show");
  },
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        res.render("users/edit", {
          user: user,
        });
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = {
        name: {
          first: req.body.first,
          last: req.body.last,
        },
        email: req.body.email,
        password: req.body.password,
      };
    User.findByIdAndUpdate(userId, {
      $set: userParams,
    })
      .then((user) => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  },
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      data: res.locals,
    });
  },
  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error.",
      };
    }
    res.json(errorObject);
  },
  join: (req, res, next) => {
    let courseId = req.params.id,
      currentUser = req.user;
    if (currentUser) {
      User.findByIdAndUpdate(currentUser, {
        $addToSet: { courses: courseId },
      })
        .then(() => {
          res.locals.success = true;
          next();
        })
        .catch((error) => {
          next(error);
        });
    } else {
      next(new Error("User must log in."));
    }
  },
};

