const Program = require('../models/program')
module.exports = {
  //display programs
  createView: async(req, res, next) => {
    res.render('programs/new')
  },
  getAll: async(req, res, next) => {
    req.data = await Program.find({})
    next()
  },
  getAllView: async(req, res, next) => {
    res.render('programs/index', {
      programs: req.data,
    })
  },
  //display individual program
  getById: async(req, res, next) => {
    req.data = await Program.findById(req.params.id)
    next()
  },
  getByIdView: async(req, res, next) => {
    res.render('programs/show', {
      program: req.data,
    })
  },
  //edit programs
  getByIdEditView: async(req, res, next) => {
    res.render('programs/edit', {
      program: req.data,
    })
  },
  edit: async(req, res, next) => {
    req.data = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
    )
    req.flash('success', 'Program updated successfully!')
    next()
  },
  editRedirect: async(req, res, next) => {
    res.redirect(`/programs/${req.data._id}`)
  },
  //delete programs
  delete: async(req, res, next) => {
    req.data = await Program.findByIdAndDelete(req.params.id)
    req.flash('success', 'Program deleted successfully!')
    next()
  },
  deleteRedirect: async(req, res, next) => {
    res.redirect('/programs')
  },
  //create programs
  create: async(req, res, next) => {
    req.data = await Program.create(req.body)
    req.flash('success', 'Program created successfully!')
    next()
  },
  createRedirect: async(req, res, next) => {
    res.redirect(`/programs/${req.data._id}`)
  },
}

