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

// Adicione após as configurações iniciais e antes do app.listen

// Middleware para processar formulários
app.use(express.urlencoded({ extended: true }));

// Rotas para Pacientes
app.get('/pesquisar-paciente', async (req, res) => {
    try {
        const { nome } = req.query;
        const pacientes = await PacienteModel.pesquisarPorNome(nome);
        const [medicos, consultas] = await Promise.all([
            MedicoModel.listarTodos(),
            ConsultaModel.listarConsultas()
        ]);
        res.render('index', { pacientes, medicos, consultas });
    } catch (error) {
        console.error('Erro na pesquisa:', error);
        res.redirect('/?error=Erro na pesquisa');
    }
});

app.post('/adicionar-paciente', async (req, res) => {
    try {
        const { nome, email, telefone, data_nascimento } = req.body;
        await PacienteModel.criar({ nome, email, telefone, data_nascimento });
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao adicionar:', error);
        res.redirect('/?error=Erro ao adicionar paciente');
    }
});

// Rotas para Médicos

app.get('/pesquisar-medico', async (req, res) => {
    try {
        const { nome } = req.query;
        const [medicos, pacientes, consultas] = await Promise.all([
            MedicoModel.pesquisarPorNome(nome),
            PacienteModel.listarPacientes(),
            ConsultaModel.listarConsultas()
        ]);
        
        res.render('index', { pacientes, medicos, consultas });
    } catch (error) {
        console.error('Erro na pesquisa:', error);
        res.redirect('/?error=Erro na pesquisa');
    }
});

// ...existing code...

app.post('/adicionar-medico', async (req, res) => {
    try {
        const { nome, especialidade, email, telefone } = req.body;
        await MedicoModel.criar({ nome, especialidade, email, telefone });
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao adicionar:', error);
        res.redirect('/?error=Erro ao adicionar médico');
    }
});

// Rotas para Consultas
app.post('/adicionar-consulta', async (req, res) => {
    try {
        const { paciente_id, medico_id, data_consulta, motivo } = req.body;
        await ConsultaModel.criar({ paciente_id, medico_id, data_consulta, motivo });
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao adicionar:', error);
        res.redirect('/?error=Erro ao adicionar consulta');
    }
});
// Main route
// ...existing code...
// Main route
app.get('/', async (req, res) => {
    try {
        // Using Promise.all to fetch data concurrently
        const [pacientes, medicos, consultas] = await Promise.all([
            PacienteModel.listarPacientes(),  // Alterado de listarTodos para listarPacientes
            MedicoModel.listarTodos(),
            ConsultaModel.listarConsultas()   // Alterado de listarTodas para listarConsultas
        ]);

        console.log('Dados carregados:', { 
            pacientes: pacientes?.length || 0,
            medicos: medicos?.length || 0,
            consultas: consultas?.length || 0
        });
// ...existing code...

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