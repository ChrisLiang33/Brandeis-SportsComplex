const facility = require('../models/facility')
module.exports = {
  //display facilities
  createView: async(req, res, next) => {
    res.render('facilities/new')
  },
  getAll: async(req, res, next) => {
    req.data = await facility.find({})
    next()
  },
  getAllView: async(req, res, next) => {
    res.render('facilities/index', {
      facilities: req.data,
    })
  },
  //displaye individual facility
  getById: async(req, res, next) => {
    req.data = await facility.findById(req.params.id)
    next()
  },
  getByIdView: async(req, res, next) => {
    res.render('facilities/show', {
      facility: req.data,
    })
  },
  getByIdEditView: async(req, res, next) => {
    res.render('facilities/edit', {
      facility: req.data,
    })
  },
  //edit facilities
  edit: async(req, res, next) => {
    req.data = await facility.findByIdAndUpdate(
      req.params.id,
      req.body,
    )
    req.flash('success', 'Facility updated successfully!')
    next()
  },
  editRedirect: async(req, res, next) => {
    res.redirect(`/facilities/${req.data._id}`)
  },
  //delete facilities
  delete: async(req, res, next) => {
    req.data = await facility.findByIdAndDelete(req.params.id)
    req.flash('success', 'Facility deleted successfully!')
    next()

  },
  deleteRedirect: async(req, res, next) => {
    res.redirect('/facilities')
  },
  //create facilities
  create: async(req, res, next) => {
    req.data = await facility.create(req.body)
    req.flash('success', 'Facility created successfully!')
    next()
  },
  createRedirect: async(req, res, next) => {
    res.redirect(`/facilities/${req.data._id}`)
  },
}

