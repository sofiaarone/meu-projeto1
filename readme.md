# Sistema de Gerenciamento de Pacientes e Consultas
## Descrição do Sistema

O Sistema de Gerenciamento de Pacientes e Consultas é uma aplicação web desenvolvida em Node.js, utilizando o padrão de arquitetura MVC (Model-View-Controller) e PostgreSQL como banco de dados. O sistema permite o gerenciamento de pacientes e suas respectivas consultas médicas.

---
## Características do projeto

Este projeto é uma aplicação web para gerenciamento de pacientes e consultas médicas, desenvolvida em Node.js com banco de dados PostgreSQL e estrutura organizada no padrão MVC. Permite o cadastro de pacientes, registro de consultas, e mantém um relacionamento entre ambos com integridade referencial. O sistema inclui um modelo relacional bem definido, scripts SQL para criação do banco e documentação clara para execução local, sendo facilmente extensível para novas funcionalidades.

---
## Estrutura de pastas 
```
meu-projeto1/
│
├── assets/
│   └── supabase-projeto.png       # Diagrama conceitual do projeto
├── documentos/
│   └── wad.md                     # Documento WAD do projeto
├── src/
│   ├── config/
│   │   └── db.js                  # Configuração de conexão com o banco de dados
│   ├── controllers/               # Lógica dos controladores (camada C do MVC)
│   │   ├── ConsultaController.js
│   │   ├── MedicoController.js
│   │   └── PacienteController.js
│   ├── models/                    # Definições dos modelos (camada M do MVC)
│   │   ├── ConsultaModel.js
│   │   ├── MedicoModel.js
│   │   └── PacienteModel.js
│   ├── routes/                    # Arquivos de rotas da aplicação
│   │   └── index.js
│   ├── scripts/                   # Arquivos de JavaScript públicos
│   │   ├── modelo-fisico.sql
│   │   └── runsql.js
│   ├── services/                  # Serviços auxiliares (ex: lógica de negócios)
│   │   ├── ConsultaService.js
│   │   └── MedicoService.js
│   │   └── PacienteService.js
│   └── views/                     # Arquivos de visualização (camada V do MVC)
│       └── home.ejs
├── .env                           # Arquivo de exemplo para variáveis de ambiente
├── .env.example                   # Exemplo de variáveis de ambiente
├── .gitignore                     # Arquivos/pastas ignorados pelo Git
├── package.json                   # Gerenciador de dependências do Node.js
├── package-lock.json              # Gerenciador de dependências do Node.js
├── README.md                      # Documentação do projeto (Markdown)
├── rest.http                      # Requisições HTTP organizadas
└── server.js                      # Arquivo principal que inicializa o servidor

```

##  Como Executar o Projeto Localmente
### Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)
- npm (instalado junto com o Node)
---
## Dependências do Projeto
Certifique-se de ter o Node.js e o PostgreSQL instalados. As dependências estão listadas no package.json, mas podem ser instaladas com:
```
npm install
```
### Principais bibliotecas:

- express- Framework web
- pg- Cliente PostgreSQL para Node.js
- dotenv- Gerenciador de variáveis de ambiente
- jest (para testes)
---
## Passos

1. Clone o repositório:
```
git clone https://github.com/sofiaarone/meu-projeto1.git
cd meu-projeto1
```
2. Instale as dependências:
```
npm install
```
3. Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=meu_projeto1
Configure o banco de dados:
```
4. Configure o banco de dados:
- Certifique-se de que o PostgreSQL está em execução.
- Crie o banco de dados:
```
createdb -U seu_usuario meu_projeto1
```
- Execute o script SQL:
```
psql -U seu_usuario -d meu_projeto1 -f scripts/schema.sql
```
5. Inicie a aplicação:
```
npm start
```
6. Acesse no navegador:

http://localhost:3001

## Rodando as Migrações
1. Criar banco de dados:

- Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo .env.
- Executar o script SQL de inicialização:
```
npm run migration
```
Esse comando executa o script SQL que cria as tabelas pacientes, medicos e consultas. Além disso, ele insere dados fictícios para testes.

## Testando as APIs
Você pode utilizar as rotas da API utilizando o Postman ou Insomnia para os seguintes endpoints: 

### Pacientes (/api/employees): 
- GET /api/pacientes: Lista todos os  pacientes.
- POST /api/pacientes: Cria um novo paciente.
- PUT /api/pacientes/:id: Atualiza um paciente.
- DELETE /api/pacientes/:id: Remove um paciente.

Exemplo de criação de paciente (POST):

```
{
  "nome": "Mariana Andrade",
  "data_nascimento": "1985-02-14",
  "email": "mari.andrade@gmail.com",
  "telefone": "11999999999"
}
```
Resposta de sucesso (201):
```
{
    "id": "e84223af-de64-41a1-a5a5-97ef4c2a2ae6",
    "nome": "Mariana Andrade",
    "data_nascimento": "1985-02-14T03:00:00.000Z",
    "email": "mari.andrade@gmail.com",
    "telefone": "11999999999",
    "criado_em": "2025-05-22T16:32:19.270Z"
}
```