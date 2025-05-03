DROP DATABASE IF EXISTS SmartBerry;
CREATE DATABASE SmartBerry;
USE SmartBerry;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR (45) NOT NULL,
    sobrenome VARCHAR(45) NOT NULL,
    username VARCHAR(45) NOT NULL UNIQUE,
    telefoneCelular VARCHAR(45) NOT NULL,
    cpf CHAR (11) NOT NULL,
    email VARCHAR (45) NOT NULL,
    senha VARCHAR(20) NOT NULL
);

CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR (45) NOT NULL,
    nomeFantasia VARCHAR (45),
    inscEstadual VARCHAR(45) NOT NULL,
    CNPJ char(11) NOT NULL,
    nomepContato VARCHAR (45),
    numeropContato VARCHAR (45),
    emailpContato VARCHAR (45),
    codigoAtivacao VARCHAR (45)
);

CREATE TABLE endereco (
    idEndereco INT,
    fkEmpresa INT,
    cep CHAR(8) NOT NULL,
    uf CHAR (2) NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    bairro VARCHAR (45) NOT NULL,
    logradouro VARCHAR (45) NOT NULL,
    numero VARCHAR(45) NOT NULL,
    complemento VARCHAR(45),

    CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    CONSTRAINT pkCompostaEndereco PRIMARY KEY (idEndereco, fkEmpresa)
);

CREATE TABLE permissoes (
    FkEmpresa INT,
    FkUsuario INT,
    GerarUser TINYINT,
    DeleteUser TINYINT,
    AcessarDashboard TINYINT,
    AlterarPermissoes TINYINT,

    CONSTRAINT pkCompostaPermissoes PRIMARY KEY (FkEmpresa, FkUsuario),
    CONSTRAINT fkEmpresaPermissoes FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    CONSTRAINT fkUsuarioPermissoes FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    CONSTRAINT chkBinEntry check(GerarUser in (0, 1) AND DeleteUser in (0, 1) AND AcessarDashboard in (0, 1) AND AlterarPermissoes in (0, 1))
);

CREATE TABLE sensor (
    idSensor INT AUTO_INCREMENT,
    fkEmpresa INT,
    canteiro VARCHAR(45) NOT NULL,
    statusAtivacao TINYINT NOT NULL,
    dtInstalacao DATETIME NOT NULL,

    CONSTRAINT fkSensorEmpresa FOREIGN KEY sensor(fkEmpresa) REFERENCES empresa(idEmpresa),
    CONSTRAINT pkCompostaSensor PRIMARY KEY (idSensor, fkEmpresa),
    CONSTRAINT ckStatus CHECK (statusAtivacao in (0,1))
);

CREATE TABLE registro (
    idRegistro INT AUTO_INCREMENT,
    fkSensor INT,
    fkEmpresa INT,
    umidadeSolo FLOAT NOT NULL,
    dtColeta DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT pkCompostaRegistro PRIMARY KEY (idRegistro, fkSensor, fkEmpresa),
    CONSTRAINT fkRegistroSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
    CONSTRAINT fkRegistroEmpresa FOREIGN KEY (fkEmpresa) REFERENCES sensor(fkEmpresa)
) AUTO_INCREMENT = 100;
