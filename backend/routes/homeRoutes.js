const express = require('express');
const { quotes_get } = require('../controllers/homeController')

const router = express.Router();

router.get('/quotes', quotes_get)

module.exports = router;