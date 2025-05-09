const express = require('express');
const app = express();
const PORT = 3000;

// Configura o EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.json());

const routes = require('./routes/index');
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});