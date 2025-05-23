const PacienteModel = require('../models/PacienteModel');

function validarNome(nome) {
  if (!nome || nome.trim().length < 2) {
    throw new Error('Nome do paciente inválido.');
  }
}

function validarEmail(email) {
  if (email && !email.includes('@')) {
    throw new Error('Email inválido.');
  }
}

module.exports = {
  async criar(payload) {
    validarNome(payload.nome);
    validarEmail(payload.email);
    return await PacienteModel.criarPaciente(
      payload.nome,
      payload.data_nascimento,
      payload.email,
      payload.telefone
    );
  },

  async listar() {
    return await PacienteModel.listarPacientes();
  },

  async editar(id, payload) {
    validarNome(payload.nome);
    validarEmail(payload.email);
    return await PacienteModel.editarPaciente(
      id,
      payload.nome,
      payload.data_nascimento,
      payload.email,
      payload.telefone
    );
  },

  async excluir(id) {
    return await PacienteModel.excluirPaciente(id);
  },
};