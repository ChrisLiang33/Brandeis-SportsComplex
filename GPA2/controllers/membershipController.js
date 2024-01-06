const Membership = require('../models/membership')

module.exports = {
  //display membership
  createView: async(req, res, next) => {
    res.render('memberships/new')
  },
  getAll: async(req, res, next) => {
    req.data = await Membership.find({})
    const user = req.user
    req.data = req.data.map((membership) => {
      membership = membership.toJSON()
      membership.isBought = user.memberships.includes(membership._id)
      return membership
    })
    next()
  },
  getAllView: async(req, res, next) => {
    res.render('memberships/index', {
      memberships: req.data,
    })
  },
  //display individual membership
  getById: async(req, res, next) => {
    req.data = await Membership.findById(req.params.id)
    next()
  },
  getByIdView: async(req, res, next) => {
    res.render('memberships/show', {
      membership: req.data,
    })
  },
  getByIdEditView: async(req, res, next) => {
    res.render('memberships/edit', {
      membership: req.data,
    })
  },
  //edit membership
  edit: async(req, res, next) => {
    req.data = await Membership.findByIdAndUpdate(
      req.params.id,
      req.body,
    )
    req.flash('success', 'Membership updated successfully!')
    next()
  },
  editRedirect: async(req, res, next) => {
    res.redirect(`/memberships/${req.data._id}`)
  },
  //delete membership
  delete: async(req, res, next) => {
    req.data = await Membership.findByIdAndDelete(req.params.id)
    req.flash('success', 'Membership deleted successfully!')
    next()
  },
  deleteRedirect: async(req, res, next) => {
    res.redirect('/memberships')
  },
  //create membership
  create: async(req, res, next) => {
    req.data = await Membership.create(req.body)
    req.flash('success', 'Membership created successfully!')
    next()
  },
  createRedirect: async(req, res, next) => {
    res.redirect(`/memberships/${req.data._id}`)
  },
  //buy/canceel membership
  buy: async(req, res, next) => {
    const user = req.user
    const membership = await Membership.findById(req.params.id)
    if (user.memberships.includes(membership._id)) {
      req.flash('error', 'You already have this membership!')
      res.redirect(`/memberships`)
    } else {
      user.memberships.push(membership._id)
      await user.save()
      req.flash('success', 'Membership bought successfully!')
      res.redirect(`/memberships`)
    }
  },
  cancel: async(req, res, next) => {
    const user = req.user
    const membership = await Membership.findById(req.params.id)
    if (user.memberships.includes(membership._id)) {
      user.memberships = user.memberships.filter((membershipId) => {
        return membershipId.toString() !== membership._id.toString()
      })
      await user.save()
      req.flash('success', 'Membership cancelled successfully!')
      res.redirect(`/memberships`)
    }
  },
}

