const pool = require('../config/db');

const ConsultaModel = {
    listarConsultas: async () => {
        const query = `
            SELECT 
                c.*,
                p.nome as paciente_nome,
                m.nome as medico_nome
            FROM consultas c
            LEFT JOIN pacientes p ON c.paciente_id = p.id
            LEFT JOIN medicos m ON c.medico_id = m.id
            ORDER BY c.data_consulta DESC
        `;
        
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Erro ao listar consultas:', error);
            throw error;
        }
    },

    criar: async (consulta) => {
        const query = `
            INSERT INTO consultas 
                (paciente_id, medico_id, data_consulta, motivo)
            VALUES 
                ($1, $2, $3, $4)
            RETURNING *
        `;
        
        try {
            const values = [
                consulta.paciente_id,
                consulta.medico_id,
                consulta.data_consulta,
                consulta.motivo
            ];
            
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao criar consulta:', error);
            throw error;
        }
    }
};

module.exports = ConsultaModel;