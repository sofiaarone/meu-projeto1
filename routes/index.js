const express = require('express');
const router = express.Router();

// Rota inicial
router.get('/', (req, res) => {
  res.render('home'); // ou res.send("Olá, mundo!");
});

module.exports = router;
