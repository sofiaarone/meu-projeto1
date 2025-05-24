const express = require('express');
const router = express.Router();

// GET - Lista todos os médicos
router.get('/', (req, res) => {
    res.json({ message: 'Listar todos os médicos' });
});

// POST - Cria um novo médico
router.post('/', (req, res) => {
    res.json({ message: 'Criar médico' });
});

module.exports = router;