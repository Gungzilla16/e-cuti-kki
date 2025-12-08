const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ptk.controller');

router.get('/', ctrl.getAll);
router.get('/', ctrl.getById);
router.post('/', ctrl.create);
router.put('/', ctrl.update);
router.delete('/', ctrl.remove);

module.exports = router;