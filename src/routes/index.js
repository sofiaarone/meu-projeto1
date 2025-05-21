const express = require('express');
const router = express.Router();
const PacienteController = require('../controllers/PacienteController');
const MedicoController = require('../controllers/MedicoController');
const ConsultaController = require('../controllers/ConsultaController');

router.post('/pacientes', PacienteController.criarPaciente);
router.get('/pacientes', PacienteController.listarPacientes);
router.put('/pacientes/:id', PacienteController.editarPaciente);
router.delete('/pacientes/:id', PacienteController.excluirPaciente);

router.post('/medicos', MedicoController.criarMedico);
router.get('/medicos', MedicoController.listarMedicos);
router.put('/medicos/:id', MedicoController.editarMedico);
router.delete('/medicos/:id', MedicoController.excluirMedico);

router.post('/consultas', ConsultaController.criarConsulta);
router.get('/consultas', ConsultaController.listarConsultas);
router.put('/consultas/:id', ConsultaController.editarConsulta);
router.delete('/consultas/:id', ConsultaController.excluirConsulta);

module.exports = router;