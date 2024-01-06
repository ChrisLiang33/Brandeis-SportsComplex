const Contact = require('../models/contact')
module.exports = {
  //create contacts
  createView: async(req, res, next) => {
    res.render('contacts/new')
  },
  //display contacts
  getAll: async(req, res, next) => {
    req.data = await Contact.find({})
    next()
  },
  getAllView: async(req, res, next) => {
    res.render('contacts/index', {
      contacts: req.data,
    })
  },
  //displaye individual contact
  getById: async(req, res, next) => {
    req.data = await Contact.findById(req.params.id)
    next()
  },
  getByIdView: async(req, res, next) => {
    res.render('contacts/show', {
      contact: req.data,
    })
  },
  getByIdEditView: async(req, res, next) => {
    res.render('contacts/edit', {
      contact: req.data,
    })
  },
  //edit contacts
  edit: async(req, res, next) => {
    req.data = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
    )
    req.flash('success', 'Contact updated successfully!')
    next()
  },
  editRedirect: async(req, res, next) => {
    res.redirect(`/contacts/${req.data._id}`)
  },
  //delete contacts
  delete: async(req, res, next) => {
    req.data = await Contact.findByIdAndDelete(req.params.id)
    req.flash('success', 'Contact deleted successfully!')
    next()
  },
  deleteRedirect: async(req, res, next) => {
    res.redirect('/contacts')
  },
  //create contact
  create: async(req, res, next) => {
    req.data = await Contact.create(req.body)
    req.flash('success', 'Contact created successfully!')
    next()
  },
  createRedirect: async(req, res, next) => {
    res.redirect(`/thankyou`)
  },
}

