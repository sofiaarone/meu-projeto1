const pool = require('../config/db');

exports.criarConsulta = async (paciente_id, medico_id, data_consulta, motivo, observacoes) => {
  const query = `
    INSERT INTO consultas (paciente_id, medico_id, data_consulta, motivo, observacoes)
    VALUES ($1, $2, $3, $4, $5) RETURNING *
  `;
  const values = [paciente_id, medico_id, data_consulta, motivo, observacoes];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.listarConsultas = async () => {
  const query = 'SELECT * FROM consultas ORDER BY id';
  const result = await pool.query(query);
  return result.rows;
};

exports.editarConsulta = async (id, motivo, observacoes) => {
  const query = `
    UPDATE consultas SET motivo = $1, observacoes = $2 WHERE id = $3 RETURNING *`;
  const values = [motivo, observacoes, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.excluirConsulta = async (id) => {
  const query = 'DELETE FROM consultas WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};