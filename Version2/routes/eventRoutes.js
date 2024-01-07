const router = require('express').Router()
const eventController = require('../controllers/eventController')
const auth = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const { body } = require('express-validator/check')

//event validation
const validateEvent = [
  body('name').isString(),
  body('description').isString(),
  body('date').toDate(),
  body('location').isString(),
  validate,
]
router.get('/', auth(), eventController.getAll, eventController.getAllView)

//create route
router.get('/create', auth(true), eventController.createView)
router.post(
  '/create',
  auth(true),
  validateEvent,
  eventController.create,
  eventController.createRedirect,
)

//route to edit
router.get(
  '/:id/edit',
  auth(true),
  eventController.getById,
  eventController.getByIdEditView,
)
router.put(
  '/:id/edit',
  auth(true),
  validateEvent,
  eventController.edit,
  eventController.editRedirect,
)
router.get('/:id', auth(), eventController.getById, eventController.getByIdView)

//route to delete
router.get(
  '/:id/delete',
  auth(true),
  eventController.delete,
  eventController.deleteRedirect,
)

module.exports = router
