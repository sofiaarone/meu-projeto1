-- Tabela de pacientes
create table if not exists pacientes (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  data_nascimento date not null,
  email text unique,
  telefone text,
  criado_em timestamp default now()
);

-- Tabela de consultas
create table if not exists consultas (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid references pacientes(id) on delete cascade,
  data_consulta date not null,
  motivo text,
  observacoes text,
  criado_em timestamp default now()
);