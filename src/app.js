const express = require('express');
const path = require('path');
const PacienteModel = require('./models/PacienteModel');
const MedicoModel = require('./models/MedicoModel');
const ConsultaModel = require('./models/ConsultaModel');

// Initialize Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const [pacientes, medicos, consultas] = await Promise.all([
            PacienteModel.listarPacientes(),
            MedicoModel.listarTodos(),
            ConsultaModel.listarConsultas()
        ]);
        
        console.log('Dados carregados:', {
            pacientes: pacientes.length,
            medicos: medicos.length,
            consultas: consultas.length
        });
        
        res.render('index', { 
            pacientes, 
            medicos, 
            consultas,
            error: req.query.error
        });
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        res.render('index', { 
            pacientes: [], 
            medicos: [], 
            consultas: [],
            error: 'Erro ao carregar dados'
        });
    }
});
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

// ...existing code...

// ...existing code...

// API Médicos
app.post('/api/medicos', async (req, res) => {
    try {
        const medico = await MedicoModel.criar(req.body);
        res.status(201).json(medico);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar médico' });
    }
});

app.get('/api/medicos', async (req, res) => {
    try {
        const medicos = await MedicoModel.listarTodos();
        res.json(medicos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar médicos' });
    }
});

// ...existing code...

app.put('/api/medicos/:id', async (req, res) => {
    try {
        const medico = await MedicoModel.editar(req.params.id, req.body);
        if (!medico) {
            return res.status(404).json({ error: 'Médico não encontrado' });
        }
        res.json(medico);
    } catch (error) {
        console.error('Erro ao editar médico:', error);
        res.status(500).json({ error: 'Erro ao editar médico' });
    }
});

// ...existing code...

app.delete('/api/medicos/:id', async (req, res) => {
    try {
        await MedicoModel.excluir(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir médico' });
    }
});

// API Consultas
// ...existing code...

app.post('/adicionar-consulta', async (req, res) => {
    try {
        const consulta = await ConsultaModel.criarConsulta(req.body);
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao criar consulta:', error);
        res.redirect('/?error=Erro ao criar consulta');
    }
});

app.post('/api/consultas', async (req, res) => {
    try {
        const consulta = await ConsultaModel.criarConsulta(req.body);
        res.status(201).json(consulta);
    } catch (error) {
        console.error('Erro ao criar consulta:', error);
        res.status(500).json({ error: 'Erro ao criar consulta' });
    }
});

// ...existing code...
app.get('/api/consultas', async (req, res) => {
    try {
        const consultas = await ConsultaModel.listarConsultas();
        res.json(consultas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar consultas' });
    }
});

app.put('/api/consultas/:id', async (req, res) => {
    try {
        const consulta = await ConsultaModel.atualizar(req.params.id, req.body);
        res.json(consulta);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar consulta' });
    }
});

app.delete('/api/consultas/:id', async (req, res) => {
    try {
        await ConsultaModel.deletar(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar consulta' });
    }
});

// ...existing code...

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;