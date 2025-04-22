CREATE DATABASE SmartBerry;
USE SmartBerry;

CREATE TABLE cliente (
idCliente INT PRIMARY KEY AUTO_INCREMENT,
nome_completo VARCHAR (45) NOT NULL,
telefone VARCHAR(11) NOT NULL,
cnpj CHAR (14) NOT NULL,
email VARCHAR (45) NOT NULL);

CREATE TABLE endereco (
idEndereco INT,
idCliente INT,
CONSTRAINT fkEnderecoCliente FOREIGN KEY (idCliente) REFERENCES cliente(idCliente),
CONSTRAINT pkCompostaEndereco PRIMARY KEY (idEndereco, idCliente),
cep VARCHAR(45) NOT NULL,
uf CHAR (2) NOT NULL,
cidade VARCHAR(45) NOT NULL,
bairro VARCHAR (45) NOT NULL,
logradouro VARCHAR (45) NOT NULL,
numero VARCHAR(5) NOT NULL,
complemento VARCHAR(45));

CREATE TABLE usuario (
idUsuario INT AUTO_INCREMENT,
fkCliente INT,
CONSTRAINT pkCompostaUsuario PRIMARY KEY (idUsuario, fkCliente),
CONSTRAINT fkUsuarioCliente FOREIGN KEY (fkCliente) REFERENCES cliente(idCliente),
login VARCHAR(45) NOT NULL,
senha VARCHAR(45) NOT NULL,
permissao CHAR(1),
CONSTRAINT chkPermissao CHECK (permissao IN ('A','S','U')));

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
fkCliente INT,
CONSTRAINT fkSensorCliente FOREIGN KEY (fkCliente) REFERENCES cliente(idCliente),
nome VARCHAR(45) NOT NULL,
modelo VARCHAR(45) NOT NULL, 
situacao TINYINT NOT NULL,
CONSTRAINT ckSituacao CHECK (situacao in (0,1)),
lugar VARCHAR(45) NOT NULL,
dtInstalacao DATETIME);

CREATE TABLE registro (
idRegistro INT AUTO_INCREMENT,
fkSensor INT DEFAULT 1,
CONSTRAINT pkCompostaRegistro PRIMARY KEY (idRegistro, fkSensor),
CONSTRAINT fkRegistroSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
dado FLOAT NOT NULL,
dtColeta DATETIME DEFAULT CURRENT_TIMESTAMP);