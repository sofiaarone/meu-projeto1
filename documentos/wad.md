# Documento de Arquitetura Web (WAD)

## Sistema de Gerenciamento de Pacientes e Consultas

## Introdução

O Sistema de Gerenciamento de Pacientes e Consultas é uma aplicação web desenvolvida com Node.js e PostgreSQL para facilitar o controle clínico básico. Voltado a clínicas, consultórios ou profissionais da saúde, o sistema permite o cadastro de pacientes, registro de consultas e acompanhamento do histórico de atendimentos. Foi estruturado seguindo o padrão de projeto MVC (Model, View, Controller), o que facilita sua manutenção, escalabilidade e organização do código.

---

## Diagrama do banco de dados

Esse é o diagrama conceitual do banco de dados:
![Supabase Projeto](./assets/supabase-projeto.png)

O SQL se encontra na pasta scripts

---

### Finalidades do Sistema

- Cadastrar e armazenar informações dos pacientes
- Registrar consultas com data, motivo e observações
- Manter o vínculo entre consultas e seus respectivos pacientes
- Permitir futuras expansões, como login de usuários ou prontuários completos

### Delimitação do projeto

O sistema contempla o controle de duas entidades principais: pacientes e consultas. Cada consulta é associada a um paciente específico e pode conter informações como data, motivo e observações. O banco de dados foi estruturado com integridade referencial, utilizando UUID como identificador único para cada registro.

### Público-alvo

- Clínicas médicas e profissionais da saúde que desejam um controle básico de pacientes
- Desenvolvedores e estudantes interessados em aprender arquitetura web com Node.js e banco relacional

---

### Entidades Principais

*Estas são os users ( usuários ), que representam os usuários do sistema.*

1. **Pacientes**
   - Armazena os dados básicos do paciente, como nome, data de nascimento, telefone e e-mail
   - Cada paciente pode estar vinculado a múltiplas consultas

2. **Consultas**
   - Representa uma consulta médica realizada
   - Contém a data, motivo, observações e referência ao paciente correspondente

---

### Vínculos e associações

- Um paciente pode ter múltiplas consultas (1:N)
- Cada consulta pertence a um único paciente (N:1)

### Regras e restrições 

- O campo email dos pacientes é único no sistema
- O campo paciente_id nas consultas referencia diretamente um paciente válido
- A exclusão de um paciente implica na exclusão automática de suas consultas (ON DELETE CASCADE)
- O sistema utiliza UUID como chave primária para evitar colisões e garantir unicidade