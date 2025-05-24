const express = require('express');
const router = express.Router();

// GET - Lista todas as consultas
router.get('/', (req, res) => {
    res.json({ message: 'Listar todas as consultas' });
});

// POST - Cria uma nova consulta
router.post('/', (req, res) => {
    res.json({ message: 'Criar consulta' });
});

module.exports = router;