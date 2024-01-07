const router = require('express').Router()
const userRoutes = require('./userRoutes'),
  eventRoutes = require('./eventRoutes'),
  homeRoutes = require('./homeRoutes'),
  facilityRoutes = require('./facilityRoutes'),
  membershipRoutes = require('./membershipRoutes'),
  programRoutes = require('./programRoutes'),
  contactRoutes = require('./contactRoutes')

//routes for each model
router.use('/users', userRoutes)
router.use('/events', eventRoutes)
router.use('/facilities', facilityRoutes)
router.use('/memberships', membershipRoutes)
router.use('/programs', programRoutes)
router.use('/contacts', contactRoutes)

// router.use("/courses", courseRoutes);
router.use('/', homeRoutes)
// router.use("/api", apiRoutes);
// router.use("/", errorRoutes);

module.exports = router
