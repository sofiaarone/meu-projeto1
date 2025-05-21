const pool = require('../config/db');

const MedicoModel = {
  criar: async ({ nome, email, telefone }) => {
    const query = 'INSERT INTO medicos (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *';
    const values = [nome, email, telefone];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  listarTodos: async () => {
    const query = 'SELECT * FROM medicos ORDER BY id';
    const result = await pool.query(query);
    return result.rows;
  },

  editar: async (id, { nome, email, telefone }) => {
    const query = 'UPDATE medicos SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *';
    const values = [nome, email, telefone, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  excluir: async (id) => {
    const query = 'DELETE FROM medicos WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};

module.exports = MedicoModel;