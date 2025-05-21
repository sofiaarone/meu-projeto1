-- Tabela de pacientes
create table IF NOT EXISTS pacientes (
  id uuid primary key default gen_random_uuid(),
  nome varchar(100) not null,
  data_nascimento date not null,
  email varchar(100) unique,
  telefone varchar(20),
  criado_em timestamp default now()
);

-- Tabela de médicos
create table IF NOT EXISTS medicos (
  id uuid primary key default gen_random_uuid(),
  nome varchar(100) not null,
  especialidade varchar(100),
  email varchar(100) unique,
  telefone varchar(20),
  criado_em timestamp default now()
);

-- Tabela de consultas
create table IF NOT EXISTS consultas (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid references pacientes(id) on delete cascade,
  medico_id uuid references medicos(id) on delete set null,
  data_consulta date not null,
  motivo varchar(255),
  observacoes varchar(500),
  criado_em timestamp default now()
);