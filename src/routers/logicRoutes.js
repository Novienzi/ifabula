const express = require('express');
const router = express.Router();
const logicCtrl = require('../controllers/logicController')

router.post('/fibonacci', logicCtrl.fibonacciCtrl)
router.post('/longestword', logicCtrl.longestWord)

module.exports = router;