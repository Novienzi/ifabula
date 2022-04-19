const express = require('express');
const router = express.Router();
const trxCtrl = require('../controllers/trxController')
const errorHandler = require('../middleware/errorMiddleware')
const passport = require('../middleware/authenticationMiddleware')


router.post('/transactions/:goodID',  passport.authenticate('bearer', { session: false }),trxCtrl.AddTrx)
router.get('/download', passport.authenticate('bearer', { session: false }), trxCtrl.download)

router.use(errorHandler)
module.exports = router;