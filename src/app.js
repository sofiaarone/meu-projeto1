const express = require('express');
const path = require('path');
const PacienteModel = require('./models/PacienteModel');
const MedicoModel = require('./models/MedicoModel');
const ConsultaModel = require('./models/ConsultaModel');

const app = express();

// Configurações e Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Rota Principal
app.get('/', async (req, res) => {
    try {
        const [pacientes, medicos, consultas] = await Promise.all([
            PacienteModel.listarPacientes(),
            MedicoModel.listarTodos(),
            ConsultaModel.listarConsultas()
        ]);
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

// API Pacientes
app.post('/api/pacientes', async (req, res) => {
    try {
        const paciente = await PacienteModel.criar(req.body);
        res.status(201).json(paciente);
    } catch (error) {
        console.error('Erro ao criar paciente:', error);
        res.status(500).json({ error: 'Erro ao criar paciente' });
    }
});

app.get('/api/pacientes', async (req, res) => {
    try {
        const pacientes = await PacienteModel.listarPacientes();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar pacientes' });
    }
});

app.put('/api/pacientes/:id', async (req, res) => {
    try {
        const paciente = await PacienteModel.editar(req.params.id, req.body);
        res.json(paciente);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }
});

app.delete('/api/pacientes/:id', async (req, res) => {
    try {
        await PacienteModel.excluir(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir paciente' });
    }
});

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

app.put('/api/medicos/:id', async (req, res) => {
    try {
        const medico = await MedicoModel.editar(req.params.id, req.body);
        res.json(medico);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar médico' });
    }
});

app.delete('/api/medicos/:id', async (req, res) => {
    try {
        await MedicoModel.excluir(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir médico' });
    }
});

// API Consultas
app.post('/api/consultas', async (req, res) => {
    try {
        const consulta = await ConsultaModel.criarConsulta(req.body);
        res.status(201).json(consulta);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar consulta' });
    }
});

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
        const consulta = await ConsultaModel.editarConsulta(req.params.id, req.body);
        res.json(consulta);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar consulta' });
    }
});

app.delete('/api/consultas/:id', async (req, res) => {
    try {
        await ConsultaModel.excluirConsulta(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir consulta' });
    }
});

// Rotas de Pesquisa
app.get('/pesquisar-medico', async (req, res) => {
    try {
        const { nome } = req.query;
        const medicos = nome ? 
            await MedicoModel.pesquisarPorNome(nome) : 
            await MedicoModel.listarTodos();
        
        const [pacientes, consultas] = await Promise.all([
            PacienteModel.listarPacientes(),
            ConsultaModel.listarConsultas()
        ]);

        res.render('index', {
            pacientes,
            medicos,
            consultas,
            searchTerm: nome || ''
        });
    } catch (error) {
        res.redirect('/?error=Erro ao pesquisar médicos');
    }
});

app.get('/pesquisar-paciente', async (req, res) => {
    try {
        const { nome } = req.query;
        const pacientes = nome ? 
            await PacienteModel.pesquisarPorNome(nome) : 
            await PacienteModel.listarPacientes();
        
        const [medicos, consultas] = await Promise.all([
            MedicoModel.listarTodos(),
            ConsultaModel.listarConsultas()
        ]);

        res.render('index', {
            pacientes,
            medicos,
            consultas,
            searchTerm: nome || ''
        });
    } catch (error) {
        res.redirect('/?error=Erro ao pesquisar pacientes');
    }
});

// Rotas de Formulário
app.post('/adicionar-paciente', async (req, res) => {
    try {
        await PacienteModel.criar(req.body);
        res.redirect('/');
    } catch (error) {
        res.redirect('/?error=Erro ao adicionar paciente');
    }
});

app.post('/adicionar-medico', async (req, res) => {
    try {
        await MedicoModel.criar(req.body);
        res.redirect('/');
    } catch (error) {
        res.redirect('/?error=Erro ao adicionar médico');
    }
});

app.post('/adicionar-consulta', async (req, res) => {
    try {
        await ConsultaModel.criarConsulta(req.body);
        res.redirect('/');
    } catch (error) {
        res.redirect('/?error=Erro ao adicionar consulta');
    }
});

// Inicialização do Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;