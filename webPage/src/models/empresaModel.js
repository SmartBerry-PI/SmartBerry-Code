var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarDuplicidade(cnpj, inscestadual, razaosocial) {
  var instrucaoSql = `SELECT * FROM empresa WHERE CNPJ = '${cnpj}' OR inscEstadual = '${inscestadual}' OR razaoSocial = '${razaosocial}'`;

  return database.executar(instrucaoSql);
}

function cadastrarEmpresa(razaosocial, nomefantasia, inscestadual, cnpj, codigo_ativacao) {
  var instrucaoSql = `INSERT INTO empresa VALUES 
(default, '${razaosocial}', '${nomefantasia}', '${inscestadual}', '${cnpj}', '${codigo_ativacao}')`;

  return database.executar(instrucaoSql);
}

function cadastrarEndereco(fkEmpresa, cep, uf, cidade, bairro,  logradouro, numero, complemento) {
  var instrucaoSql = `INSERT INTO endereco VALUES (default, '${fkEmpresa}', '${cep}', '${uf}', '${cidade}', '${bairro}', '${logradouro}', '${numero}', '${complemento}')`;

  return database.executar(instrucaoSql);
}

function buscarFkEmpresa(cnpj) {
  var instrucaoSql = `SELECT idEmpresa FROM empresa WHERE CNPJ = '${cnpj}' AND idEmpresa > 0`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarDuplicidade, buscarPorId, cadastrarEmpresa, cadastrarEndereco, buscarFkEmpresa, listar };
