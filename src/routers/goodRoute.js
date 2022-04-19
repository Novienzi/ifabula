const express = require('express');
const router = express.Router();
const companyCtrl = require('../controllers/goodControllers')
const passport = require('../middleware/authenticationMiddleware')
const errorHandler = require('../middleware/errorMiddleware')


router.get('/goods',  passport.authenticate('bearer', { session: false }),companyCtrl.getAllGood)

router.use(errorHandler)
module.exports = router;