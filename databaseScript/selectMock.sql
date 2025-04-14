SELECT * FROM cliente AS c 
	JOIN usuario AS u 
		ON u.fkCliente=c.idCliente
    JOIN endereco AS e 
		ON e.idCliente=c.idCliente
    JOIN sensor AS s 
		ON s.fkCliente=c.idCliente;

SELECT r.dado AS 'UMIDADE (%)', r.dtColeta AS 'Data e hora', concat(s.nome,' ',s.modelo) AS 'Sensor', c.nome_completo AS 'Cliente'
	FROM registro AS r 
		JOIN sensor AS s ON r.fkSensor=s.idSensor 
        JOIN cliente AS c ON s.fkCliente=c.idCliente
ORDER BY r.dtColeta DESC;