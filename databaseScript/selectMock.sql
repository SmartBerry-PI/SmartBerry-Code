SELECT * FROM usuario AS u
	JOIN permissoes AS p
		ON u.idusuario =p.fkusuario
    JOIN empresa AS e 
		ON p.fkempresa=e.idEmpresa
    LEFT JOIN endereco AS ende ON ende.idEmpresa 
		ON s.fkCliente=c.idCliente; -- Select Completo
        
SELECT 
    u.login AS 'Login',
    u.senha AS 'Senha',
	CONCAT(c.nome_completo, ' (', c.cnpj, ' )') AS 'Cliente',
    CONCAT(e.logradouro, ', ', e.numero, ifnull(CONCAT(' ', e.complemento), ''), ' - ', e.bairro, ', ', e.cidade, ' - ', e.UF, ' (', e.cep, ') ') AS 'Endereço'
FROM
    cliente AS c
        JOIN
    usuario AS u ON u.fkCliente = c.idCliente
        JOIN
    endereco AS e ON e.idCliente = c.idCliente; -- Select infos do usuario/cliente
    
SELECT 
    s.nome AS 'Sensor',
    s.modelo AS 'Modelo',
    CASE WHEN s.situacao=1 THEN 'Ativo' ELSE 'Inativo' END AS 'Status',
    c.cnpj AS 'Cliente'    
FROM
    sensor AS s
        JOIN
    cliente AS c ON s.fkCliente = c.idCliente; -- Select sensores do cliente
    
SELECT 
    u.login AS 'Usuário',
    CASE WHEN u.permissao='A' THEN 'Administrador' WHEN u.permissao='S' THEN 'Supervisor' ELSE 'Usuário Comum' END AS 'Permissão',
    c.cnpj AS 'Cliente'
FROM
    cliente AS c
        JOIN
    usuario AS u ON c.idCliente = u.fkCliente; -- Select usuarios do cliente

SELECT r.dado AS 'UMIDADE (%)', r.dtColeta AS 'Data e hora', concat(s.nome,' - ',s.modelo) AS 'Sensor', c.nome_completo AS 'Cliente'
	FROM registro AS r 
		JOIN sensor AS s ON r.fkSensor=s.idSensor 
        JOIN cliente AS c ON s.fkCliente=c.idCliente
ORDER BY r.dtColeta DESC; -- Select dados inseridos

SELECT 
	s.idSensor AS 'Sensor',
    CASE WHEN (r.dado>80 OR r.dado<70) THEN 'Alerta' ELSE '' END AS 'Alerta',
    r.dtColeta AS 'Horário'
FROM
    registro AS r JOIN sensor AS s ON r.fkSensor=s.idSensor; -- Select Alerta
    
SELECT 
	s.idSensor AS 'Sensor',
	CASE WHEN s.statusAtivacao = 1 THEN 'Ativo' ELSE 'Inativo' END AS StatusSensor,
	s.dtInstalacao AS DataInstalação,
    e.nomeFantasia AS Empresa,
    c.descricao AS Canteiro
	FROM sensor AS s
	JOIN empresa AS e ON s.fkEmpresa = e.idEmpresa
	JOIN canteiro AS c ON s.fkCanteiro = c.idCanteiro AND s.fkEmpresa = c.fkEmpresa;