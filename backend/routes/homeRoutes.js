const express = require('express');
const { quotes_get, jokes_get, trivias_get } = require('../controllers/homeController')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.status(200).json('connection succeeded!')
    } catch (err) {
        res.status(400).json(err.message)
    }
})
router.get('/quotes', quotes_get);
router.get('/jokes', jokes_get);
router.get('/trivias', trivias_get);

module.exports = router;