CREATE USER 'datacquino'@'%' IDENTIFIED BY 'Datacquino#123.';

GRANT INSERT ON SmartBerry.registro TO 'datacquino'@'%';

CREATE USER 'webdataviz'@'%' IDENTIFIED BY 'Webdataviz#123.';

GRANT ALL PRIVILEGES ON SmartBerry.* TO 'webdataviz'@'%';

CREATE USER 'dev'@'%' IDENTIFIED BY 'Dev#123.';

GRANT SELECT ON SmartBerry.* TO 'dev'@'%';

FLUSH PRIVILEGES;