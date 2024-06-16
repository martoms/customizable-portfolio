const express = require('express');
const { quotes_get, jokes_get, trivias_get } = require('../controllers/homeController')

const router = express.Router();

router.get('/quotes', quotes_get);
router.get('/jokes', jokes_get);
router.get('/trivias', trivias_get);

module.exports = router;