const pool = require('../config/db');

const ConsultaModel = {
    listarConsultas: async () => {
        try {
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
            const result = await pool.query(query);
            
            // Format dates in the response
            const consultas = result.rows.map(consulta => ({
                ...consulta,
                data_consulta: new Date(consulta.data_consulta)
                    .toISOString()
                    .replace('T', ' ')
                    .substring(0, 19)
            }));
            
            return consultas;
        } catch (error) {
            console.error('Erro ao listar consultas:', error);
            throw error;
        }
    },

    criarConsulta: async (consulta) => {
        try {
            if (!consulta.paciente_id || !consulta.medico_id || !consulta.data_consulta || !consulta.motivo) {
                throw new Error('Campos obrigatórios faltando');
            }

            const dataConsulta = new Date(consulta.data_consulta);
            if (isNaN(dataConsulta.getTime())) {
                throw new Error('Data inválida');
            }

            const query = `
                INSERT INTO consultas 
                    (paciente_id, medico_id, data_consulta, motivo, observacoes)
                VALUES 
                    ($1, $2, $3::timestamptz, $4, $5)
                RETURNING *,
                    (SELECT nome FROM pacientes WHERE id = $1) as paciente_nome,
                    (SELECT nome FROM medicos WHERE id = $2) as medico_nome
            `;
            
            const values = [
                consulta.paciente_id,
                consulta.medico_id,
                dataConsulta.toISOString(),
                consulta.motivo,
                consulta.observacoes || ''
            ];

            const result = await pool.query(query, values);
            
            // Format date in the response
            const consultaCriada = result.rows[0];
            consultaCriada.data_consulta = new Date(consultaCriada.data_consulta)
                .toISOString()
                .replace('T', ' ')
                .substring(0, 19);

            return consultaCriada;
        } catch (error) {
            console.error('Erro ao criar consulta:', error);
            throw error;
        }
    },

    editarConsulta: async (id, consulta) => {
        try {
            if (!consulta.paciente_id || !consulta.medico_id || !consulta.data_consulta || !consulta.motivo) {
                throw new Error('Campos obrigatórios faltando');
            }

            const dataConsulta = new Date(consulta.data_consulta);
            if (isNaN(dataConsulta.getTime())) {
                throw new Error('Data inválida');
            }

            const query = `
                UPDATE consultas 
                SET 
                    paciente_id = $1,
                    medico_id = $2,
                    data_consulta = $3::timestamptz,
                    motivo = $4,
                    observacoes = $5,
                    atualizado_em = CURRENT_TIMESTAMP
                WHERE id = $6
                RETURNING *,
                    (SELECT nome FROM pacientes WHERE id = $1) as paciente_nome,
                    (SELECT nome FROM medicos WHERE id = $2) as medico_nome
            `;
            
            const values = [
                consulta.paciente_id,
                consulta.medico_id,
                dataConsulta.toISOString(),
                consulta.motivo,
                consulta.observacoes || '',
                id
            ];

            const result = await pool.query(query, values);
            
            if (result.rows.length === 0) {
                throw new Error('Consulta não encontrada');
            }

            // Format date in the response
            const consultaAtualizada = result.rows[0];
            consultaAtualizada.data_consulta = new Date(consultaAtualizada.data_consulta)
                .toISOString()
                .replace('T', ' ')
                .substring(0, 19);

            return consultaAtualizada;
        } catch (error) {
            console.error('Erro ao editar consulta:', error);
            throw error;
        }
    },

    excluirConsulta: async (id) => {
        try {
            const query = 'DELETE FROM consultas WHERE id = $1 RETURNING *';
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