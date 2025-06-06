const pool = require('../config/db');

const MedicoModel = {
    listarTodos: async () => {
        try {
            const result = await pool.query('SELECT * FROM medicos ORDER BY nome');
            return result.rows;
        } catch (error) {
            console.error('Erro ao listar médicos:', error);
            throw error;
        }
    },

    criar: async (medico) => {
        try {
            const query = `
                INSERT INTO medicos (nome, especialidade, email, telefone)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `;
            const values = [
                medico.nome,
                medico.especialidade,
                medico.email,
                medico.telefone
            ];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao criar médico:', error);
            throw error;
        }
    },

    editar: async (id, medico) => {
        try {
            const query = `
                UPDATE medicos 
                SET nome = $1, 
                    especialidade = $2, 
                    email = $3, 
                    telefone = $4
                WHERE id = $5
                RETURNING *
            `;
            const values = [
                medico.nome,
                medico.especialidade,
                medico.email,
                medico.telefone,
                id
            ];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao editar médico:', error);
            throw error;
        }
    },

    excluir: async (id) => {
        try {
            const query = 'DELETE FROM medicos WHERE id = $1 RETURNING *';
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao excluir médico:', error);
            throw error;
        }
    }
};

module.exports = MedicoModel;