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
  var instrucaoSql = `SELECT * FROM empresa WHERE CNPJ = '${cnpj}' OR inscEstadual = '${inscestadual} OR razaoSocial = '${razaosocial}`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaosocial, nomefantasia, inscestadual, cnpj, cep, uf, cidade, bairro, logradouro, numero, complemento) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarDuplicidade, buscarPorId, cadastrar, listar };
