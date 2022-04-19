const express = require('express');

const router = express.Router();

router.get('/api', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Welcome to API to manage a product data!',
    version: '1.0.0',
  });
});

module.exports = router;