const ConsultaModel = require('../models/ConsultaModel');

function validarDadosConsulta({ paciente_id, medico_id, data_consulta }) {
  if (!paciente_id || !data_consulta) {
    throw new Error("Paciente e data da consulta são obrigatórios.");
  }

}

module.exports = {
  async criarConsulta(payload) {
    validarDadosConsulta(payload);
    return await ConsultaModel.criar(payload);
  },

  async listarConsultas() {
    return await ConsultaModel.listarTodas();
  },

  async editarConsulta(id, payload) {
    validarDadosConsulta(payload);
    return await ConsultaModel.editar(id, payload);
  },

  async excluirConsulta(id) {
    return await ConsultaModel.excluir(id);
  }
};