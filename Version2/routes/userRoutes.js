const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')
const validate = require('../middlewares/validate')
const { body } = require('express-validator/check')

//validate users
const validateUser = [
  body('first').isString(),
  body('last').isString(),
  body('email').isEmail(),
  body('password').isString(),
  validate,
]
const validateLogin = [
  body('email').isEmail(),
  body('password').isString(),
  validate,
]
//user index,page
router.get(
  '/',
  auth(true),
  validateUser,
  userController.getAll,
  userController.getAllView,
)
//CREATE function
router.get('/create', auth(true), userController.createView)
router.post(
  '/create',
  auth(true),
  validateUser,
  userController.create,
  userController.createRedirect,
)
router.get('/login', userController.loginView)
router.post(
  '/login',
  validateLogin,
  userController.authenticate,
  userController.loginRedirect,
)
router.get('/signup', validateUser, userController.signupView)
router.post(
  '/signup',
  validateUser,
  userController.register,
  userController.registerRedirect,
)
router.get('/logout', userController.logout, userController.logoutRedirect)
router.get(
  '/:id/edit',
  auth(),
  userController.getById,
  userController.getByIdEditView,
)
//edit/delete function
router.put('/:id/edit',
  auth(),
  validateUser,
  userController.edit, userController.editRedirect,
)
router.get('/:id', auth(), userController.getById, userController.getByIdView)
router.get(
  '/:id/delete',
  auth(),
  userController.delete,
  userController.deleteRedirect,
)

module.exports = router
