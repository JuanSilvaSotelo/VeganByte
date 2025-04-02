const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middlewares/adminAuth');
const adminController = require('../controllers/admin.controller');

router.post('/login', adminController.loginAdmin);
router.get('/usuarios-activos', verifyAdmin, adminController.getUsuariosActivos);
router.get('/eventos', verifyAdmin, (req, res) => {
  // Lógica para obtener eventos
});
router.post('/eventos', verifyAdmin, (req, res) => {
  // Lógica para crear nuevos eventos
});

module.exports = router;