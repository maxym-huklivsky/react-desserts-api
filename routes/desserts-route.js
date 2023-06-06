const express = require('express');
const dessertsController = require('../controllers/desserts-controller');
const checkQuery = require('../middlewares/checkQuery');

const router = express.Router();

router.get('/', checkQuery, dessertsController.getAll);

router.get('/:id', dessertsController.getById);

module.exports = router;
