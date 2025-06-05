const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Listar todas as consultas' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Criar consulta' });
});

module.exports = router;