DROP DATABASE IF EXISTS SmartBerry;
CREATE DATABASE SmartBerry;
USE SmartBerry;

CREATE TABLE usuario (
    idUsuario        INT           PRIMARY KEY AUTO_INCREMENT,
    nome             VARCHAR (45)  NOT NULL,
    sobrenome        VARCHAR(45)   NOT NULL,
    username         VARCHAR(45)   NOT NULL UNIQUE,
    telefoneCelular  VARCHAR(45)   NOT NULL,
    cpf              VARCHAR (20)  NOT NULL,
    email            VARCHAR (45)  NOT NULL,
    senha            VARCHAR(500)  NOT NULL,
    contaSup         TINYINT       DEFAULT 0
);

CREATE TABLE empresa (
    idEmpresa     INT            PRIMARY KEY AUTO_INCREMENT,
    razaoSocial   VARCHAR (45)   NOT NULL,
    inscEstadual  VARCHAR(45)    NOT NULL,
    CNPJ          CHAR (11)      NOT NULL,
    codigoAcesso  VARCHAR (10)   NOT NULL,
    nomeFantasia  VARCHAR (45)
);

CREATE TABLE endereco (
    idEndereco   INT           AUTO_INCREMENT,
    fkEmpresa    INT,
    cep          CHAR(8)       NOT NULL,
    uf           CHAR (2)      NOT NULL,
    cidade       VARCHAR(45)   NOT NULL,
    bairro       VARCHAR (45)  NOT NULL,
    logradouro   VARCHAR (45)  NOT NULL,
    numero       VARCHAR(45)   NOT NULL,
    complemento  VARCHAR(45),

    CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    CONSTRAINT pkCompostaEndereco PRIMARY KEY (idEndereco, fkEmpresa)
);

CREATE TABLE log_acesso (
	idLog_Acesso   INT,
    FkEmpresa      INT,
    FkUsuario      INT,
    dtLog_Acesso   DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pkCompostaLog PRIMARY KEY (FkEmpresa, FkUsuario, idLog_Acesso),
    CONSTRAINT fkEmpresaLog FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    CONSTRAINT fkUsuarioLog FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE canteiro (
    idCanteiro INT           AUTO_INCREMENT,
    fkEmpresa  INT,
    descricao  VARCHAR (80),
    dtCriacao  DATETIME      DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pkCompostaCanteiro PRIMARY KEY (idCanteiro,fkEmpresa),
    CONSTRAINT fkCanteiroEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE sensor (
    idSensor        INT       AUTO_INCREMENT,
    fkEmpresa       INT,
    fkCanteiro      INT,
    statusAtivacao  TINYINT   NOT NULL,
    dtInstalacao    DATETIME  NOT NULL,
    
    CONSTRAINT pkCompostaSensor PRIMARY KEY (idSensor, fkEmpresa),  
	CONSTRAINT fkSensorCanteiro FOREIGN KEY sensor(fkCanteiro) REFERENCES canteiro(idCanteiro),
    CONSTRAINT fkSensorEmpresa FOREIGN KEY sensor(fkEmpresa) REFERENCES empresa(idEmpresa),
    CONSTRAINT ckStatus CHECK (statusAtivacao in (0,1))
);

CREATE TABLE leitura (
    idLeitura    INT       AUTO_INCREMENT,
    fkSensor     INT,
    fkEmpresa    INT,
    fkCanteiro   INT,
    umidadeSolo  FLOAT     NOT NULL,
    dtColeta     DATETIME  DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT pkCompostaLeitura PRIMARY KEY (idLeitura, fkSensor, fkEmpresa, fkCanteiro),
    CONSTRAINT fkLeituraCanteiro FOREIGN KEY (fkCanteiro) REFERENCES sensor(fkCanteiro),
    CONSTRAINT fkLeituraSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
    CONSTRAINT fkLeituraEmpresa FOREIGN KEY (fkEmpresa) REFERENCES sensor(fkEmpresa)
) AUTO_INCREMENT = 100;

CREATE TABLE alerta (
    idAlerta    INT       AUTO_INCREMENT,
    fkSensor    INT,
    fkEmpresa   INT,
    fkCanteiro  INT,
    fkLeitura   INT,
    dtAlerta    DATETIME  DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pkCompostaAlerta PRIMARY KEY(idAlerta, fkLeitura, fkSensor, fkEmpresa, fkCanteiro),
    CONSTRAINT fkAlertaCanteiro FOREIGN KEY (fkCanteiro) REFERENCES sensor(fkCanteiro),
    CONSTRAINT fkAlertaSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
    CONSTRAINT fkAlertaEmpresa FOREIGN KEY (fkEmpresa) REFERENCES sensor(fkEmpresa),
    CONSTRAINT fkAlertaLeitura FOREIGN KEY (fkLeitura) REFERENCES leitura(idLeitura)
);

CREATE TABLE contato (
  idContato   INT AUTO_INCREMENT,
  fkEmpresa   INT,
  nome        VARCHAR(45),
  numero      VARCHAR(45),
  email       VARCHAR(45),
  
  CONSTRAINT pkCompostaContato PRIMARY KEY (idContato, fkEmpresa),
  CONSTRAINT fkContatoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

DELIMITER $$
DROP TRIGGER IF EXISTS TG_after_data_insert_alert;
CREATE TRIGGER TG_after_data_insert_alert 
    AFTER INSERT ON leitura FOR EACH ROW 
	BEGIN 
		IF (NEW.umidadeSolo>80 OR NEW.umidadeSolo<70) THEN
			INSERT INTO alerta (fkSensor, fkEmpresa, fkCanteiro, fkLeitura) VALUES (NEW.fkSensor, NEW.fkEmpresa, NEW.fkCanteiro, NEW.idLeitura);
		END IF;
    END;$$
DELIMITER ;