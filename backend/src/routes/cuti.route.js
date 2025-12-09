const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cuti.controller')

router.post('/', ctrl.create);     // ajukan cuti
router.get('/', ctrl.getAll);      // list cuti (join ptk/sekolah/jenis)
router.get('/:id', ctrl.getById);

module.exports = router;