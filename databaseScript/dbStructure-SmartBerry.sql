CREATE DATABASE SmartBerry;
USE SmartBerry;

CREATE TABLE cliente (
idCliente INT PRIMARY KEY AUTO_INCREMENT,
nome_completo VARCHAR (45) NOT NULL,
telefone VARCHAR(11) NOT NULL,
cpf CHAR (11) NOT NULL,
email VARCHAR (45) NOT NULL, 
senha VARCHAR (45) NOT NULL);

CREATE TABLE endereco (
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
cep VARCHAR(45) NOT NULL,
uf CHAR (2) NOT NULL,
cidade VARCHAR(45) NOT NULL,
bairro VARCHAR (45) NOT NULL,
logradouro VARCHAR (45) NOT NULL,
numero VARCHAR(45) NOT NULL,
complemento VARCHAR(45),
fkCliente INT NOT NULL,
CONSTRAINT fkEnderecoCliente FOREIGN KEY (fkCliente) REFERENCES cliente(idCliente));

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
modelo VARCHAR(45) NOT NULL, 
situacao TINYINT NOT NULL,
CONSTRAINT ckSituacao CHECK (situacao in (0,1)),
lugar VARCHAR(45) NOT NULL,
dtInstalacao DATETIME,
fkCliente INT NOT NULL,
CONSTRAINT fkSensorCliente FOREIGN KEY (fkCliente) REFERENCES cliente(idCliente));

CREATE TABLE registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
dado FLOAT NOT NULL,
dtColeta DATETIME DEFAULT CURRENT_TIMESTAMP,
fkSensor INT DEFAULT 1,
CONSTRAINT fkRegistroSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor));