var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var razaosocial = req.body.razaosocialServer;
  var nomefantasia = req.body.nomefantasiaServer;
  var inscestadual = req.body.inscestadualServer;
  var cnpj = req.body.cnpjServer;
  var cep = req.body.cepServer;
  var uf = req.body.ufServer;
  var cidade = req.body.cidadeServer;
  var bairro = req.body.bairroServer;
  var logradouro = req.body.logradouroServer;
  var numero = req.body.numeroServer;
  var complemento = req.body.complementoServer;

  empresaModel.buscarDuplicidade(cnpj, inscestadual,razaosocial).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa já existe` });
    } else {
      empresaModel.cadastrar(razaosocial, nomefantasia, inscestadual, cnpj, cep, uf, cidade, bairro, logradouro, numero, complemento).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
