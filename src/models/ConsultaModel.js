const pool = require('../config/db');

const ConsultaModel = {
    listarConsultas: async () => {
        const query = `
            SELECT 
                c.*,
                p.nome as paciente_nome,
                m.nome as medico_nome,
                TO_CHAR(c.data_consulta, 'DD/MM/YYYY HH24:MI') as data_formatada
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

    criarConsulta: async (consulta) => {
        const query = `
            INSERT INTO consultas 
                (paciente_id, medico_id, data_consulta, motivo, observacoes)
            VALUES 
                ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        
        try {
            const values = [
                consulta.paciente_id,
                consulta.medico_id,
                consulta.data_consulta,
                consulta.motivo,
                consulta.observacoes || ''
            ];
            
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao criar consulta:', error);
            throw error;
        }
    },

    editarConsulta: async (id, consulta) => {
        const query = `
            UPDATE consultas 
            SET 
                paciente_id = $1,
                medico_id = $2,
                data_consulta = $3,
                motivo = $4,
                observacoes = $5
            WHERE id = $6
            RETURNING *
        `;
        
        try {
            const values = [
                consulta.paciente_id,
                consulta.medico_id,
                consulta.data_consulta,
                consulta.motivo,
                consulta.observacoes || '',
                id
            ];
            
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao editar consulta:', error);
            throw error;
        }
    },

    excluirConsulta: async (id) => {
        const query = 'DELETE FROM consultas WHERE id = $1 RETURNING *';
        try {
            const result = await pool.query(query, [id]);
            if (result.rows.length === 0) {
                throw new Error('Consulta não encontrada');
            }
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao excluir consulta:', error);
            throw error;
        }
    }
};

module.exports = ConsultaModel;