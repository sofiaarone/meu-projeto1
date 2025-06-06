const pool = require('../config/db');

const PacienteModel = {
    listarPacientes: async () => {
        try {
            const query = 'SELECT * FROM pacientes ORDER BY nome';
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Erro ao listar pacientes:', error);
            throw error;
        }
    },

    criar: async (paciente) => {
        try {
            const query = `
                INSERT INTO pacientes 
                    (nome, data_nascimento, email, telefone)
                VALUES 
                    ($1, $2::date, $3, $4)
                RETURNING *
            `;
            
            const values = [
                paciente.nome,
                paciente.data_nascimento,
                paciente.email,
                paciente.telefone
            ];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao criar paciente:', error);
            throw error;
        }
    },

    editar: async (id, paciente) => {
        try {
            const query = `
                UPDATE pacientes 
                SET nome = $1, 
                    data_nascimento = $2::date, 
                    email = $3, 
                    telefone = $4
                WHERE id = $5
                RETURNING *
            `;
            
            const values = [
                paciente.nome,
                paciente.data_nascimento,
                paciente.email,
                paciente.telefone,
                id
            ];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao editar paciente:', error);
            throw error;
        }
    },

    excluir: async (id) => {
        try {
            const query = 'DELETE FROM pacientes WHERE id = $1 RETURNING *';
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao excluir paciente:', error);
            throw error;
        }
    }
};

module.exports = PacienteModel;