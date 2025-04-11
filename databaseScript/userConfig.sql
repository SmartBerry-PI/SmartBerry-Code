CREATE USER 'api'@'%' IDENTIFIED BY 'Api#123.';

GRANT INSERT ON SmartBerr.registro TO 'api'@'%';

FLUSH PRIVILEGES;