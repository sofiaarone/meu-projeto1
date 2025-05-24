const express = require('express');
const path = require('path');

const app = express();

// Log para todas as requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rota mais simples para teste
app.get('/', (req, res) => {
    console.log('Rota principal acessada');
    res.send('<h1>Olá! O servidor está funcionando!</h1>');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});