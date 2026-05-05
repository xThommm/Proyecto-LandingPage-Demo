const express = require('express');

const router = express.Router();

const {
  getMenu,
  saveMenu,
  uploadImage
} = require('../controllers/menuController');

const { login } = require('../controllers/authController'); 

const upload = require('../middleware/upload');

const auth = require('../middleware/auth');


// =========================================================
// RUTAS
// =========================================================

// Auth — ruta pública, sin middleware
router.post('/auth', login);

// Imagen — considerá agregar auth acá también
router.post('/upload', auth, upload.single('image'), uploadImage);

// Menú público (sin auth)
router.get('/menu', getMenu);

// Menú protegido
router.put('/menu', auth, saveMenu);

module.exports = router;