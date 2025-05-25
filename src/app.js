const express = require('express');
const path = require('path');

const app = express();

// Configura o EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Define o caminho para as views

// Log para todas as requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rota principal usando EJS
app.get('/', (req, res) => {
    console.log('Rota principal acessada');
    res.render('index'); // Renderiza views/index.ejs
});

// Rota extra usando home.ejs
app.get('/home', (req, res) => {
    res.render('home');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
