const ConsultaModel = require('../models/ConsultaModel');

exports.criarConsulta = async (req, res) => {
  const { paciente_id, medico_id, data_consulta, motivo, observacoes } = req.body;
  try {
    const consulta = await ConsultaModel.criarConsulta(paciente_id, medico_id, data_consulta, motivo, observacoes);
    res.status(201).json(consulta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarConsultas = async (req, res) => {
  try {
    const consultas = await ConsultaModel.listarConsultas();
    res.status(200).json(consultas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarConsulta = async (req, res) => {
  const { id } = req.params;
  const { motivo, observacoes } = req.body;
  try {
    const consulta = await ConsultaModel.editarConsulta(id, motivo, observacoes);
    if (!consulta) {
      return res.status(404).json({ message: 'Consulta não encontrada ou não pode ser editada' });
    }
    res.status(200).json(consulta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirConsulta = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = await ConsultaModel.excluirConsulta(id);
    if (!consulta) {
      return res.status(404).json({ message: 'Consulta não encontrada ou não pode ser excluída' });
    }
    res.status(200).json({ message: 'Consulta excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};