const PacienteModel = require('../models/PacienteModel');

exports.criarPaciente = async (req, res) => {
  const { nome, data_nascimento, email, telefone } = req.body;
  try {
    const paciente = await PacienteModel.criarPaciente(nome, data_nascimento, email, telefone);
    res.status(201).json(paciente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarPacientes = async (req, res) => {
  try {
    const pacientes = await PacienteModel.listarPacientes();
    res.status(200).json(pacientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarPaciente = async (req, res) => {
  const { id } = req.params;
  const { nome, data_nascimento, email, telefone } = req.body;
  try {
    const paciente = await PacienteModel.editarPaciente(id, nome, data_nascimento, email, telefone);
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    res.status(200).json(paciente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirPaciente = async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await PacienteModel.excluirPaciente(id);
    if (!paciente) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }
    res.status(200).json({ message: 'Paciente excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};