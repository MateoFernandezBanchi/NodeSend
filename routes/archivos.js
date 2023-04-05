const express = require('express');
const router = express.Router();
const archivosController = require('../controllers/archivosController');
const auth = require('../middleware/auth');

router.post('/',
    auth,
    archivosController.subirArchivo
);

router.delete('/',
    archivosController.eliminarArchivo
);

module.exports = router;