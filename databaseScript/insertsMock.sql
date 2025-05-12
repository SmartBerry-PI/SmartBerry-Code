INSERT INTO usuario VALUE (1000, 'João', 'Silva', 'jo_silva', '12345678910', '11999998888', 'joao.silva@email.com', 'senha@segura123');

INSERT INTO empresa VALUE (1000, 'JoSil.agrofarm', 'Recanto do Morango', '110.042.490.140', '12345678000190');

INSERT INTO endereco VALUE (1000, 1000, '12345678', 'SP', 'São Roque', 'Centro', 'Av. Brasil', '106');

INSERT INTO canteiro VALUE (1000, 1000, 'Canteiro 1A', current_timestamp);

INSERT INTO sensor VALUES
	(1000, 1000, 1000, 'Sensor 1', 1, current_timestamp),
	(1001, 1000, 1000, 'Sensor 2', 1, current_timestamp),
	(1002, 1000, 1000, 'Sensor 3', 1, current_timestamp);