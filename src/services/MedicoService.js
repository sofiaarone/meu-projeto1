// src/services/medicoService.js
const MedicoModel = require('../models/MedicoModel');

function validarDadosMedico({ nome, email, telefone }) {
  if (!nome) throw new Error("Nome do médico é obrigatório.");
  if (email && !email.includes('@')) {
    throw new Error("E-mail inválido.");
  }
  if (telefone && telefone.length < 8) {
    throw new Error("Telefone inválido.");
  }
}

module.exports = {
  async criarMedico(payload) {
    validarDadosMedico(payload);
    return await MedicoModel.criar(payload);
  },

  async listarMedicos() {
    return await MedicoModel.listarTodos();
  },

  async editarMedico(id, payload) {
    validarDadosMedico(payload);
    return await MedicoModel.editar(id, payload);
  },

  async excluirMedico(id) {
    return await MedicoModel.excluir(id);
  }
};