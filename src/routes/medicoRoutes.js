const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Listar todos os médicos' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Criar médico' });
});

module.exports = router;