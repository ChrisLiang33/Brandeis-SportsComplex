const router = require('express').Router()
const programController = require('../controllers/programController')
const auth = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const { body } = require('express-validator/check')

//program validation
const validateProgram = [
  body('name').isString(),
  body('description').isString(),
  body('schedule').isString(),
  body('instructor').isString(),
  validate,
]

router.get('/', auth(),programController.getAll, programController.getAllView)
//create function
router.get('/create', auth(true), programController.createView)
router.post(
  '/create',
  auth(true),
  validateProgram,
  programController.create,
  programController.createRedirect,
)

//edit function
router.get(
  '/:id/edit',
  auth(true),
  programController.getById,
  programController.getByIdEditView,
)
router.put(
  '/:id/edit',
  auth(true),
  validateProgram,
  programController.edit,
  programController.editRedirect,
)

//delete function
router.get('/:id', auth(),programController.getById, programController.getByIdView)
router.get(
  '/:id/delete',
  auth(true),
  programController.delete,
  programController.deleteRedirect,
)

module.exports = router
