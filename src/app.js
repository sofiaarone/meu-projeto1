const express = require('express');
const path = require('path');
const PacienteModel = require('./models/PacienteModel');
const MedicoModel = require('./models/MedicoModel');
const ConsultaModel = require('./models/ConsultaModel');

// Initialize Express
const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Main route
app.get('/', async (req, res) => {
    try {
        // Using Promise.all to fetch data concurrently
        const [pacientes, medicos, consultas] = await Promise.all([
            PacienteModel.listarTodos(),
            MedicoModel.listarTodos(),
            ConsultaModel.listarTodas()
        ]);

        console.log('Dados carregados:', { 
            pacientes: pacientes?.length || 0,
            medicos: medicos?.length || 0,
            consultas: consultas?.length || 0
        });

        res.render('index', {
            pacientes: pacientes || [],
            medicos: medicos || [],
            consultas: consultas || []
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.render('index', {
            pacientes: [],
            medicos: [],
            consultas: [],
            error: 'Erro ao carregar dados'
        });
    }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;