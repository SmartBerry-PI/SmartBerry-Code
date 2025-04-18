CREATE USER 'api'@'%' IDENTIFIED BY 'Api#123.';

GRANT INSERT ON SmartBerry.registro TO 'api'@'%';

FLUSH PRIVILEGES;

CREATE USER 'dev'@'%' IDENTIFIED BY 'Dev#123.';

GRANT SELECT ON SmartBerry.* TO 'api'@'%';