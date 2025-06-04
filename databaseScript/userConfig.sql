DROP USER IF EXISTS datacquino;
CREATE USER 'datacquino'@'%' IDENTIFIED BY 'Datacquino#123.';
GRANT INSERT ON SmartBerry.leitura TO 'datacquino'@'%';

DROP USER IF EXISTS webdataviz;
CREATE USER 'webdataviz'@'%' IDENTIFIED BY 'Webdataviz#123.';
GRANT ALL PRIVILEGES ON SmartBerry.* TO 'webdataviz'@'%';

DROP USER IF EXISTS dev;
CREATE USER 'dev'@'%' IDENTIFIED BY 'Dev#123.';
GRANT SELECT ON SmartBerry.* TO 'dev'@'%';

FLUSH PRIVILEGES;