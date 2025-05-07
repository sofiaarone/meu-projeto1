Table users {
  id int [pk, increment]
  nome varchar
  email varchar [unique]
  senha varchar
  tipo enum('medico', 'ubs', 'admin')
  criado_em timestamp
}

Table ubs {
  id int [pk, increment]
  nome varchar
  endereco text
  telefone varchar
}

Table patients {
  id int [pk, increment]
  nome varchar
  cpf varchar [unique]
  data_nascimento date
  endereco text
  telefone varchar
  id_ubs int [ref: > ubs.id]
}

Table wounds {
  id int [pk, increment]
  id_patient int [ref: > patients.id]
  tipo varchar
  localizacao varchar
  data_inicio date
}

Table assessments {
  id int [pk, increment]
  id_wound int [ref: > wounds.id]
  id_user int [ref: > users.id]
  data date
  observacoes text
  imagem_url text
}