const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController')
const errorHandler = require('../middleware/errorMiddleware')


router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)

router.use(errorHandler)
module.exports = router;