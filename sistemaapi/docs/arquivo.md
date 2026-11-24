Identificar os requisitos funcionais:

1- RF-001 - Preparar massa - Bater os ingredientes - .... 
2- RF-002
3- RF-003
...

-------------------------------------------------------

Requisitos de infraestrutura:

SGBD:
	Nome: MySQL Server
	Versão: "select version()" = 8.0.45

Linguagem de programação:

	Nome: Java Script e Node.js
	Versão: "node -v" = 25.4.0


----------------------------------------------------------------------------------------------------- CD /FRONTEND
npm create vite@latest
nome igual ao da pasta
react
eslint
javascript

limpar assets e public

criar as pages e as componentes

requisitos; ex: autenticar usuário, registrar, listar e etc

LoginPage ---- inicial

import useState
export default function

npm i react-router-dom

-------------------------------------------------------------------------------------------------------- CD /BACKEND
criar docs e src
	- config, controllers, middlewares, routes, utils

terminal: npm init -y

ir no package.json
add no scripts:
"scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

mudar o TYPE para module

------------------------------------------------------------------------------------ DIAGRAMA
database > reverse> next, execute, select banco e tirar print


------------------------------------------------------------------------------------------BANCO DE DADOS
CREATE DATABASE oficina_db;

use oficina_db;

create table clientes (
	id int auto_increment primary key,
	nome varchar(100) not null,
    cpf varchar(255) not null,
    telefone varchar(20) not null,
    email varchar(100) not null,
	criado_em timestamp default current_timestamp
); 

create table veiculos (
	id int auto_increment primary key,
	placa varchar(10) not null,
    modelo varchar(50) not null,
    marca varchar(50) not null,
    ano int not null,
	cliente_id int not null,
    foreign key (cliente_id)
		references clientes(id)
);  

create table agendamentos (
	id int auto_increment primary key,
	data_agendamento datetime not null,
    descricao_servico varchar(50) not null,
    veiculo_id int not null,
    status varchar(50) default 'Agendado',
    foreign key (veiculo_id)
		references veiculos(id)
); 

create table usuarios (
	id int auto_increment primary key,
	nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(255) not null,
	criado_em timestamp default current_timestamp
); 


