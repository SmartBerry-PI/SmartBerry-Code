var database = require("../database/config")

function autenticar(usuario, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", usuario, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, username, senha, cpf, telefoneCelular, sobrenome
        FROM usuario 
        WHERE (username = '${usuario}' OR email = '${usuario}') AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function autenticarCodigo(codigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",codigo)
    var instrucaoSql = `
        SELECT idEmpresa as 'IdEmpresa'
        FROM empresa
        WHERE codigoAcesso = '${codigo}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, sobrenome, email, senha, cpf, telefone, username) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, email, senha, cpf, telefone, username);

    var instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha, cpf, telefoneCelular, username) VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', '${cpf}', '${telefone}', '${username}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarcanteiros(fk_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fk_empresa);

    var instrucaoSql = `
        select c.idCanteiro as 'id_canteiro' from empresa as e join canteiro as c on c.fkEmpresa = e.idEmpresa where fkEmpresa = ${fk_empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarqtdsensores(fk_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fk_empresa);

    var instrucaoSql = `
       select s.idSensor, s.fkCanteiro from sensor as s join canteiro as c 
        on c.idCanteiro = s.fkCanteiro
        join empresa as e
        on e.idEmpresa = c.fkEmpresa
        where s.FkEmpresa = ${fk_empresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarumidade(fk_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fk_empresa);

    var instrucaoSql = `
       select idLeitura,umidadeSolo,statusAtivacao from leitura as l  join sensor as s on (l.fkSensor, l.fkCanteiro, l.fkEmpresa) = (s.idSensor, s.fkCanteiro, s.fkEmpresa)
        where l.fkEmpresa = '${fk_empresa}'ORDER BY l.idLeitura desc limit 24;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function statussensor(fk_empresa, fk_canteiro, fk_sensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fk_empresa, fk_sensor, fk_canteiro);

    var instrucaoSql = `
       select s.statusAtivacao from sensor as s join canteiro as c 
        on c.idCanteiro = s.fkCanteiro
        join empresa as e
        on e.idEmpresa = c.fkEmpresa
        where s.fkEmpresa = '${fk_empresa}' and s.idSensor = '${fk_sensor}' and s.fkCanteiro = '${fk_canteiro}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function variacao24(fk_empresa, fk_canteiro, fk_sensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fk_empresa, fk_sensor, fk_canteiro);

    var instrucaoSql = `
       select truncate((max(umidadeSolo) - min(umidadeSolo)),1) as 'variacao' from leitura as l join sensor as s
        on l.fkSensor = s.idSensor
        join canteiro as c
        on c.idCanteiro = s.fkCanteiro
        join empresa as e
        on e.idEmpresa = c.fkEmpresa
        where s.idSensor = '${fk_sensor}' and l.FkCanteiro = '${fk_canteiro}' and l.FkEmpresa = '${fk_empresa}' and dtColeta >= NOW() - INTERVAL 1 DAY;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function inserirlog(id, idE, log_acesso_id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",id, idE, log_acesso_id);

    var instrucaoSql = `
        insert into log_acesso values('${log_acesso_id}','${idE}','${id}',default);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarultimolog() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    var instrucaoSql = `
        select max(idLog_Acesso) as 'ultimo_log' from log_acesso;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscaralertasdasemana(fk_empresa, fk_canteiro, fk_sensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fk_empresa, fk_sensor, fk_canteiro);

    var instrucaoSql = `
       select count(idAlerta) as 'qtdAlerta' from alerta as a join leitura as l
        on a.fkLeitura = l.idLeitura
        join sensor as s
        on s.idSensor = l.fkSensor
        join canteiro as c
        on c.idCanteiro = s.fkCanteiro
        join empresa as e
        on e.idEmpresa = c.fkEmpresa
        where s.idSensor = '${fk_sensor}' and c.idCanteiro = '${fk_canteiro}' and e.idEmpresa = '${fk_empresa}' and dtAlerta >= NOW() - INTERVAL 7 DAY;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscardiaalerta(fk_empresa, fk_canteiro, fk_sensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fk_empresa, fk_sensor, fk_canteiro);

    var instrucaoSql = `
        select count(idAlerta) as 'maioralertas',dayname(dtAlerta) as 'dia' from alerta
        where fkSensor = '${fk_sensor}' and fkCanteiro = '${fk_canteiro}' and fkEmpresa = '${fk_empresa}' and dtAlerta between NOW() - INTERVAL 7 DAY and NOW()
        group by dayname(dtAlerta)
        order by maioralertas desc limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function obterdadosdeumidade(fk_empresa, fk_canteiro, fk_sensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fk_empresa, fk_sensor, fk_canteiro);

    var instrucaoSql = `
       select umidadeSolo, dtColeta from leitura where fkSensor = '${fk_sensor}' and fkEmpresa = '${fk_empresa}' and fkCanteiro = '${fk_canteiro}' order by idLeitura desc LIMIT 25;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function atualizardadosdeumidade(fk_empresa, fk_canteiro, fk_sensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fk_empresa, fk_sensor, fk_canteiro);

    var instrucaoSql = `
       select umidadeSolo, dtColeta from leitura where fkSensor = '${fk_sensor}' and fkEmpresa = '${fk_empresa}' and fkCanteiro = '${fk_canteiro}' order by idLeitura desc LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarAlertas(fk_empresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fk_empresa);

    var instrucaoSql = `
       select * from alerta where fkEmpresa = '${fk_empresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarcanteiros,
    buscarqtdsensores,
    buscarumidade,
    statussensor,
    variacao24,
    inserirlog,
    buscarultimolog,
    autenticarCodigo,
    buscaralertasdasemana,
    buscardiaalerta,
    obterdadosdeumidade,
    atualizardadosdeumidade,
    buscarAlertas
};