const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Listar todos os pacientes' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Criar paciente' });
});

module.exports = router;