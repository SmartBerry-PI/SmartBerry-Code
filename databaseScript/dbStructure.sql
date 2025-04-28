CREATE DATABASE SmartBerry;
USE SmartBerry;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (45) NOT NULL,
sobrenome VARCHAR(45) NOT NULL,
username VARCHAR(45) NOT NULL,
TelefoneCelular VARCHAR(45) NOT NULL,
cpf CHAR (11) NOT NULL,
email VARCHAR (45) NOT NULL,
senha VARCHAR(20) UNIQUE,
fkEmpresa INT,
CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa));

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR (45) NOT NULL,
nomeFantasia VARCHAR (45) UNIQUE,
inscEstadual VARCHAR(45) NOT NULL,
nomepContato VARCHAR (45) NOT NULL,
numeropContato VARCHAR (45) NOT NULL,
emailpContato VARCHAR (45));

CREATE TABLE endereco (
idEndereco INT,
fkEmpresa INT,
CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
CONSTRAINT pkCompostaEndereco PRIMARY KEY (idEndereco, fkEmpresa),
cep VARCHAR(45) NOT NULL,
uf CHAR (2) NOT NULL,
cidade VARCHAR(45) NOT NULL,
bairro VARCHAR (45) NOT NULL,
logradouro VARCHAR (45) NOT NULL,
numero VARCHAR(5) NOT NULL,
complemento VARCHAR(45) UNIQUE);

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
fkEmpresa INT,
fkEndereco INT,
CONSTRAINT fkSensorEmpresa FOREIGN KEY sensor(fkEmpresa) REFERENCES endereco(fkEmpresa),
CONSTRAINT fkSensorEndereco FOREIGN KEY sensor(fkEndereco) REFERENCES endereco(idEndereco),
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