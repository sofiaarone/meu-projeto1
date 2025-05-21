const MedicoModel = require('../models/MedicoModel');

exports.criarMedico = async (req, res) => {
  try {
    const medico = await MedicoModel.criar(req.body);
    res.status(201).json(medico);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarMedicos = async (req, res) => {
  try {
    const medicos = await MedicoModel.listarTodos();
    res.status(200).json(medicos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarMedico = async (req, res) => {
  try {
    const medico = await MedicoModel.editar(req.params.id, req.body);
    if (!medico) {
      return res.status(404).json({ message: 'Profissional não encontrado' });
    }
    res.status(200).json(medico);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirMedico = async (req, res) => {
  try {
    const medico = await MedicoModel.excluir(req.params.id);
    if (!medico) {
      return res.status(404).json({ message: 'Profissional não encontrado' });
    }
    res.status(200).json({ message: 'Profissional excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};