const express = require('express');
const router = express.Router();

// GET - Lista todos os pacientes
router.get('/', (req, res) => {
    res.json({ message: 'Listar todos os pacientes' });
});

// POST - Cria um novo paciente
router.post('/', (req, res) => {
    res.json({ message: 'Criar paciente' });
});

module.exports = router;