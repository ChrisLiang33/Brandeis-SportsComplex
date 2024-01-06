const router = require('express').Router()
const membershipController = require('../controllers/membershipController')
const auth = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const { body } = require('express-validator/check')
const validateMembership = [
  body('type').isString(),
  body('duration').isNumeric(),
  body('price').isNumeric(),
  validate,
]

//indexpage for membership
router.get(
  '/',
  auth(),
  membershipController.getAll,
  membershipController.getAllView,
)
//create function for membership
router.get('/create', auth(true), membershipController.createView)
router.post(
  '/create',
  auth(true),
  validateMembership,
  membershipController.create,
  membershipController.createRedirect,
)
//edit functions for membership
router.get(
  '/:id/edit',
  auth(true),
  membershipController.getById,
  membershipController.getByIdEditView,
)
router.put(
  '/:id/edit',
  auth(true),
  validateMembership,
  membershipController.edit,
  membershipController.editRedirect,
)

//individual page for membership
router.get(
  '/:id',
  auth(),
  membershipController.getById,
  membershipController.getByIdView,
)
//delete and buy function for membership
router.get(
  '/:id/delete',
  auth(true),
  membershipController.delete,
  membershipController.deleteRedirect,
)
router.get(
  '/:id/buy',
  auth(),
  membershipController.buy,
  membershipController.getAllView,
)

router.get(
  '/:id/cancel',
  auth(),
  membershipController.cancel,
  membershipController.getAllView,
)

module.exports = router
