const router = require('express').Router()
const facilityController = require('../controllers/facilityController')
const auth = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const { body } = require('express-validator/check')

//validate facility
const validateFacility = [
  body('name').isString(),
  body('description').isString(),
  body('type').isString(),
  validate,
]

router.get('/', auth(),facilityController.getAll, facilityController.getAllView)

//create route
router.get('/create', auth(true), facilityController.createView)
router.post(
  '/create',
  auth(true),
  validateFacility,
  facilityController.create,
  facilityController.createRedirect,
)

//edite route
router.get(
  '/:id/edit',
  auth(true),
  facilityController.getById,
  facilityController.getByIdEditView,
)
router.put(
  '/:id/edit',
  auth(true),
  validateFacility,
  facilityController.edit,
  facilityController.editRedirect,
)
router.get('/:id', auth(),facilityController.getById, facilityController.getByIdView)

//delete route
router.get(
  '/:id/delete',
  auth(true),
  facilityController.delete,
  facilityController.deleteRedirect,
)

module.exports = router
