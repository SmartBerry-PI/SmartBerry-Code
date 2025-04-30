CREATE DATABASE SmartBerry;
USE SmartBerry;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (45) NOT NULL,
sobrenome VARCHAR(45) NOT NULL,
username VARCHAR(45) NOT NULL UNIQUE,
TelefoneCelular VARCHAR(45) NOT NULL,
cpf CHAR (11) NOT NULL,
email VARCHAR (45) NOT NULL,
senha VARCHAR(20) UNIQUE
);

CREATE TABLE permissoes (
FkEmpresa INT,
FkUsuario INT,
CONSTRAINT pkCompostaPermissoes PRIMARY KEY (FkEmpresa, FkUsuario),
GerarUser TINYINT,
CONSTRAINT chkGerarUser
check(GerarUser in('0','1')),
DeleteUser TINYINT,
CONSTRAINT chkDeleUser
check(DeleteUser in('0','1')),
AcessarDashboard TINYINT,
CONSTRAINT chkAcessarDashboard
check(AcessarDashboard in('0','1')),
AlterarPermissoes TINYINT,
CONSTRAINT chkAlterarPermissoes
check(AlterarPermissoes in('0','1'))
);

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR (45) NOT NULL,
nomeFantasia VARCHAR (45),
inscEstadual VARCHAR(45) NOT NULL,
CNPJ char(11) NOT NULL,
nomepContato VARCHAR (45) NOT NULL,
numeropContato VARCHAR (45) NOT NULL,
emailpContato VARCHAR (45) NOT NULL);

CREATE TABLE endereco (
idEndereco INT,
fkEmpresa INT,
CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
CONSTRAINT pkCompostaEndereco PRIMARY KEY (idEndereco, fkEmpresa),
cep CHAR(8) NOT NULL,
uf CHAR (2) NOT NULL,
cidade VARCHAR(45) NOT NULL,
bairro VARCHAR (45) NOT NULL,
logradouro VARCHAR (45) NOT NULL,
numero VARCHAR(45) NOT NULL,
complemento VARCHAR(45));

CREATE TABLE sensor (
idSensor INT AUTO_INCREMENT,
fkEmpresa INT,
CONSTRAINT fkSensorEmpresa FOREIGN KEY sensor(fkEmpresa) REFERENCES empresa(idEmpresa),
CONSTRAINT pkCompostaSensor PRIMARY KEY (idSensor, fkEmpresa),
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
umidadeSolo FLOAT NOT NULL,
dtColeta DATETIME DEFAULT CURRENT_TIMESTAMP);
