module.exports = (isAdmin) => {
  return (req, res, next) => {
    if (req.user && (isAdmin ? req.user.isAdmin : true)) {
      next()
    } else {
      if (isAdmin) {
        req.flash('error', 'You must be an admin to view this page')
      } else {
        req.flash('error', 'You must be logged in to view this page')
      }
      res.redirect('/users/login')
    }
  }

}
