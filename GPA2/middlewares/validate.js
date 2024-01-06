const { body, validationResult } = require('express-validator/check')

function validate(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash('error', 'Please enter a valid value')
  }
  next()
}

module.exports = validate
