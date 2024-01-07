const router = require('express').Router()
const contactController = require('../controllers/contactController')
const auth = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const { body } = require('express-validator/check')

//contact validation
const validateContact = [
  body('name').isString(),
  body('email').isString(),
  body('title').isString(),
  body('issue').isString(),
  validate,
]
router.get('/', auth(true), contactController.getAll, contactController.getAllView)

//route to create
router.post(
  '/create',
  validateContact,
  contactController.create,
  contactController.createRedirect,
)
//route to view and delete
router.get(
  '/:id',
  auth(true),
  contactController.getById,
  contactController.getByIdView,
)
router.get(
  '/:id/delete',
  auth(true),
  contactController.delete,
  contactController.deleteRedirect,
)

module.exports = router
