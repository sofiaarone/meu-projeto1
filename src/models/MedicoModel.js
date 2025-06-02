const pool = require('../config/db');

const MedicoModel = {
    pesquisarPorNome: async (nome) => {
        try {
            const query = 'SELECT * FROM medicos WHERE nome ILIKE $1 ORDER BY nome';
            const result = await pool.query(query, [`%${nome}%`]);
            return result.rows;
        } catch (error) {
            console.error('Erro ao pesquisar médicos:', error);
            return [];
        }
    },

    listarTodos: async () => {
        try {
            const query = 'SELECT * FROM medicos ORDER BY nome';
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Erro ao listar médicos:', error);
            return [];
        }
    },

    criar: async (medico) => {
        try {
            const query = `
                INSERT INTO medicos (nome, especialidade, email, telefone)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `;
            const values = [medico.nome, medico.especialidade, medico.email, medico.telefone];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao criar médico:', error);
            throw error;
        }
    }
};

module.exports = MedicoModel;