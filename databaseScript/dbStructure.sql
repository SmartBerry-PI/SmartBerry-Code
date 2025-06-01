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
    senha VARCHAR(500) NOT NULL,
    contaSup tinyint default 0
);
SELECT idUsuario, nome, email, username, senha, cpf, telefoneCelular, sobrenome, FkEmpresa 
FROM usuario as u JOIN log_acesso
on u.idUsuario = log_acesso.FkUsuario
join empresa
on log_acesso.FkEmpresa = empresa.idEmpresa
WHERE (u.username = 'jo_silva' OR u.email = 'joao.silva@email.com') AND u.senha = 'senha@segura123' AND empresa.codigoAcesso = 'abc123def4';
select * from usuario;
select * from empresa;
select * from log_acesso;
CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR (45) NOT NULL,
    nomeFantasia VARCHAR (45),
    inscEstadual VARCHAR(45) NOT NULL,
    CNPJ char(11) NOT NULL,
    codigoAcesso VARCHAR(10) NOT NULL
);

CREATE TABLE endereco (
    idEndereco INT AUTO_INCREMENT,
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

CREATE TABLE log_acesso (
	idLog_Acesso INT,
    FkEmpresa INT,
    FkUsuario INT,
    dtLog_Acesso DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pkCompostaLog PRIMARY KEY (FkEmpresa, FkUsuario, idLog_Acesso),
    CONSTRAINT fkEmpresaLog FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    CONSTRAINT fkUsuarioLog FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

select count(s.idSensor) as 'qtd_sensor' from sensor as s join canteiro as c 
on c.idCanteiro = s.fkCanteiro
join empresa as e
on e.idEmpresa = c.fkEmpresa
where s.fkEmpresa = 1 and s.fkCanteiro = 1;

CREATE TABLE canteiro (
idCanteiro INT AUTO_INCREMENT,
fkEmpresa INT,
dtCriacao DATETIME DEFAULT CURRENT_TIMESTAMP,
descricao VARCHAR (80),
PRIMARY KEY (idCanteiro,fkEmpresa),

CONSTRAINT fkCanteiroEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa));
SELECT idSensor ,statusAtivacao from sensor where statusAtivacao = 0;
CREATE TABLE sensor (
    idSensor INT AUTO_INCREMENT,
    fkEmpresa INT,
    fkCanteiro INT,
    statusAtivacao TINYINT NOT NULL,
    dtInstalacao DATETIME NOT NULL,
    
	CONSTRAINT fkSensorCanteiro FOREIGN KEY sensor(fkCanteiro) REFERENCES canteiro(idCanteiro),
    CONSTRAINT fkSensorEmpresa FOREIGN KEY sensor(fkEmpresa) REFERENCES empresa(idEmpresa),
    CONSTRAINT pkCompostaSensor PRIMARY KEY (idSensor, fkEmpresa),
    CONSTRAINT ckStatus CHECK (statusAtivacao in (0,1))
);
select s.statusAtivacao from sensor as s join canteiro as c 
on c.idCanteiro = s.fkCanteiro
join empresa as e
on e.idEmpresa = c.fkEmpresa
where s.fkEmpresa = 1 and s.idSensor = 1 and s.fkCanteiro = 1;

select l.* from leitura as l join sensor as s
on l.fkSensor = s.idSensor
join canteiro as c
on c.idCanteiro = s.fkCanteiro
join empresa as e
on e.idEmpresa = c.fkEmpresa
where s.idSensor = 1 and l.FkCanteiro = 1 and l.FkEmpresa = 1 ORDER BY l.idLeitura desc LIMIT 1;
CREATE TABLE leitura (
    idLeitura INT AUTO_INCREMENT,
    fkSensor INT,
    fkEmpresa INT,
    fkCanteiro INT,
    umidadeSolo FLOAT NOT NULL,
    dtColeta DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT pkCompostaLeitura PRIMARY KEY (idLeitura, fkSensor, fkEmpresa, fkCanteiro),
    CONSTRAINT fkLeituraCanteiro FOREIGN KEY (fkCanteiro) REFERENCES sensor(fkCanteiro),
    CONSTRAINT fkLeituraSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
    CONSTRAINT fkLeituraEmpresa FOREIGN KEY (fkEmpresa) REFERENCES sensor(fkEmpresa)
) AUTO_INCREMENT = 100;
select max(idLog_Acesso) as 'ultimo_log' from log_acesso;
SELECT * from log_acesso;
  
CREATE TABLE alerta (
idAlerta INT AUTO_INCREMENT,
fkSensor INT,
fkEmpresa INT,
fkCanteiro INT,
fkLeitura int,
CONSTRAINT pkCompostaAlerta PRIMARY KEY(idAlerta, fkLeitura, fkSensor, fkEmpresa, fkCanteiro),
CONSTRAINT fkAlertaCanteiro FOREIGN KEY (fkCanteiro) REFERENCES sensor(fkCanteiro),
CONSTRAINT fkAlertaSensor FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
CONSTRAINT fkAlertaEmpresa FOREIGN KEY (fkEmpresa) REFERENCES sensor(fkEmpresa),
CONSTRAINT fkAlertaLeitura FOREIGN KEY (fkLeitura) REFERENCES leitura(idLeitura),
dtAlerta DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contato (
  idContato INT AUTO_INCREMENT,
  fkEmpresa INT,
  nome VARCHAR(45),
  numero VARCHAR(45),
  email VARCHAR(45),
  
  CONSTRAINT pkCompostaContato PRIMARY KEY (idContato, fkEmpresa),
  CONSTRAINT fkContatoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa));
  
INSERT INTO usuario VALUE (1, 'Suporte', 'smartberry', 'smartberry-Suporte', '12345678910', '11999998888', 'smartberry@smartberry.com', 'senha@seguraSUPORTE123');



select truncate((max(umidadeSolo) - min(umidadeSolo)),1) as 'variacao' from leitura as l join sensor as s
on l.fkSensor = s.idSensor
join canteiro as c
on c.idCanteiro = s.fkCanteiro
join empresa as e
on e.idEmpresa = c.fkEmpresa
where s.idSensor = 1 and l.FkCanteiro = 1 and l.FkEmpresa = 1 and dtColeta >= NOW() - INTERVAL 1 DAY;
select count(a.idAlerta) as 'Qtd_alerta' from alerta as a join leitura as l
on a.fkLeitura = l.idLeitura
join sensor as s 
on l.fkSensor = s.idSensor
join canteiro as c
on c.idCanteiro = s.fkCanteiro
join empresa as e
on c.fkEmpresa = e.idEmpresa
where s.idSensor = 1 and l.FkCanteiro = 1 and l.FkEmpresa = 1 and dtAlerta >= NOW() - INTERVAL 7 DAY;
SELECT * FROM leitura;

