const Event = require('../models/event')
module.exports = {
  //display events
  createView: async(req, res, next) => {
    res.render('events/new')
  },
  getAll: async(req, res, next) => {
    req.data = await Event.find({})
    next()
  },
  getAllView: async(req, res, next) => {
    res.render('events/index', {
      events: req.data,
    })
  },
  //displaye individual event
  getById: async(req, res, next) => {
    req.data = await Event.findById(req.params.id)
    next()
  },
  getByIdView: async(req, res, next) => {
    res.render('events/show', {
      event: req.data,
    })
  },
  getByIdEditView: async(req, res, next) => {
    res.render('events/edit', {
      event: req.data,
    })
  },
  //edit events
  edit: async(req, res, next) => {
    req.data = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
    )
    req.flash('success', 'Event updated successfully!')
    next()
  },
  editRedirect: async(req, res, next) => {
    res.redirect(`/events/${req.data._id}`)
  },
  //delete events
  delete: async(req, res, next) => {
    req.data = await Event.findByIdAndDelete(req.params.id)
    req.flash('success', 'Event deleted successfully!')
    next()
  },
  deleteRedirect: async(req, res, next) => {
    res.redirect('/events')
  },
  //create events
  create: async(req, res, next) => {
    req.data = await Event.create(req.body)
    req.flash('success', 'Event created successfully!')
    next()
  },
  createRedirect: async(req, res, next) => {
    res.redirect(`/events/${req.data._id}`)
  },
}

