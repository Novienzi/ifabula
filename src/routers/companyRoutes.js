const express = require('express');
const router = express.Router();
const companyCtrl = require('../controllers/companyController')
const errorHandler = require('../middleware/errorMiddleware')
const passport = require('../middleware/authenticationMiddleware')


router.post('/company', passport.authenticate('bearer', { session: false }),companyCtrl.AddCompany)

router.use(errorHandler)
module.exports = router;