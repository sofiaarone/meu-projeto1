const pool = require('../config/db');

exports.criarPaciente = async (nome, data_nascimento, email, telefone) => {
  const query = `
    INSERT INTO pacientes (nome, data_nascimento, email, telefone)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [nome, data_nascimento, email, telefone];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.listarPacientes = async () => {
  const query = 'SELECT * FROM pacientes ORDER BY id';
  const result = await pool.query(query);
  return result.rows;
};

exports.editarPaciente = async (id, nome, data_nascimento, email, telefone) => {
  const query = `
    UPDATE pacientes
    SET nome = $1, data_nascimento = $2, email = $3, telefone = $4
    WHERE id = $5 RETURNING *`;
  const values = [nome, data_nascimento, email, telefone, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.excluirPaciente = async (id) => {
  const query = 'DELETE FROM pacientes WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};