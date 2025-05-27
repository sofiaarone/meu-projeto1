const express = require('express');
const path = require('path');

const app = express();

// Debug logs
console.log('Diretório atual:', __dirname);
console.log('Caminho das views:', path.join(__dirname, 'views'));

// Configura o EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Log para todas as requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rota principal com tratamento de erro
app.get('/', (req, res, next) => {
    console.log('Tentando renderizar index.ejs');
    res.render('index', (err, html) => {
        if (err) {
            console.error('Erro ao renderizar:', err);
            return next(err);
        }
        res.send(html);
    });
});

const PORT = 3001; // Mudando para porta 3001
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});