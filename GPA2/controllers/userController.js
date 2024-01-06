const User = require('../models/user')
const passport = require('passport')
const Membership = require('../controllers/membershipController')
const MembershipModel = require('../models/membership')
const bcrypt = require('bcryptjs')
module.exports = {
  //to display users
  getAll: async(req, res, next) => {
    //get virtual fullName
    req.data = await User.find({})
    req.data = req.data.map((user) => {
      user = user.toJSON()
      user.fullName = user.name.first + ' ' + user.name.last
      return user
    })
    next()
  },
  getAllView: async(req, res, next) => {
    res.render('users/index', {
      users: req.data,
    })
  },
// to display individual users
  getById: async(req, res, next) => {
    let data = await User.findById(req.params.id)
    data = JSON.parse(JSON.stringify(data))
    data.memberships = await Promise.all(data.memberships.map(async(membership) => {
      return await MembershipModel.findById(membership)
    }))
    data.fullName = data.name.first + ' ' + data.name.last
    req.data = data
    next()
  },
  getByIdView: async(req, res, next) => {
    res.render('users/show', {
      user: req.data,
    })
  },
  getByIdEditView: async(req, res, next) => {
    res.render('users/edit', {
      user: req.data,
    })
  },
  //edit user
  edit: async(req, res, next) => {
    const data = {
      name: {
        first: req.body.first,
        last: req.body.last,
      },
      email: req.body.email,
      password: req.body.password,
    }
    const currentUser = await User.findByIdAndUpdate(
      req.params.id,
      data,
    )
    console.log(req.user.password, req.body.password)
    await currentUser.changePassword(req.user.password, req.body.password)
    req.user = currentUser
    req.data = currentUser
    req.flash('success', 'User updated!')
    next()
  },
  editRedirect: async(req, res, next) => {
    res.redirect(`/users/${req.data._id}`)
  },
  //to delete user
  delete: async(req, res, next) => {
    req.data = await User.findByIdAndDelete(req.params.id)
    req.flash('success', 'User deleted!')
    next()
  },
  deleteRedirect: async(req, res, next) => {
    res.redirect('/users')
  },
  //to create user
  createView: async(req, res, next) => {
    res.render('users/new')
  },
  signupView: async(req, res, next) => {
    res.render('users/signup')
  },
  register: async(req, res, next) => {
    const data = {
      name: {
        first: req.body.first,
        last: req.body.last,
      },
      email: req.body.email,
      password: req.body.password,
    }
    const newUser = new User(data)
    User.register(newUser, data.password, (error, user) => {
      console.log(user)
      if (user) {
        req.flash(
          'success',
          `${user.fullName}'s account created successfully!`,
        )
        res.redirect('/')
      } else {
        req.flash(
          'error',
          `Failed to create user account because: ${error.message}.`,
        )
        res.redirect('/users/login')
      }
    })

  },
  create: async(req, res, next) => {
    const data = {
      name: {
        first: req.body.first,
        last: req.body.last,
      },
      email: req.body.email,
      password: req.body.password,
    }
    req.data = await User.create(data)
    req.flash('success', 'User created!')
    next()
  },
  createRedirect: async(req, res, next) => {
    res.redirect(`/users/${req.data._id}`)
  },
  registerRedirect: async(req, res, next) => {
    res.redirect(`/users/login`)
  },
  //verbose
  authenticate: passport.authenticate(
    'local',
    {
      failureRedirect: '/users/login',
      failureFlash: 'Failed to login.',
    },
  ),
  //login/logout
  loginView: (req, res) => {
    res.render('users/login')
  },
  loginRedirect: async(req, res, next) => {
    if (req.user) {
      req.flash('success', 'Welcome!')
      res.redirect(`/users/${req.user._id}`)
    } else {
      req.flash('error', 'Failed to login.')
      res.redirect(`/users/login`)
    }
  },
  logout: (req, res, next) => {
    req.logout(function(err) {
      if (err) {
        return next(err)
      }
      req.flash('success', 'You have been logged out!')
      res.locals.redirect = '/'
      next()
    })
  },
  logoutRedirect: async(req, res, next) => {
    res.redirect(`/users/login`)
  },
  /*
  authenticate: passport.authenticate('local', {
    failureRedirect: '/users/page/login',
    failureFlash: 'Failed to login.',
    successRedirect: '/users',
  }),
  logout: (req, res, next) => {
    req.logout(function(err) {
      if (err) {
        return next(err)
      }
      req.flash('success', 'You have been logged out!')
      res.locals.redirect = '/'
      next()
    })
  },
  addMembership: async({ id, type }) => {
    const user = await User.findById(id)
    const membership = await Membership.getByType({ type })
    if (!membership) {
      throw new Error('Membership not found')
    }
    if (!user.memberships) {
      user.memberships = [membership._id]
    } else {
      if (user.memberships.includes(membership._id)) {
        throw new Error('Membership already added')
      } else {
        user.memberships.push(membership._id)
      }
    }
    await user.save()
  },*/
}

