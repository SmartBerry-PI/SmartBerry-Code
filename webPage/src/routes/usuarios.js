var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});
router.post("/autenticarCodigo", function (req, res) {
    usuarioController.autenticarCodigo(req, res);
});
router.get(`/buscarcanteiros/:fk_empresa`, function (req,res) {
    usuarioController.buscarcanteiros(req,res);
});
router.get(`/buscarqtdsensores/:fk_empresa`, function (req,res) {
    usuarioController.buscarqtdsensores(req,res);
});
router.get(`/buscarumidade/:fk_empresa`, function (req,res) {
    usuarioController.buscarumidade(req,res);
});
router.get(`/statussensor/:fk_empresa/:fk_canteiro/:fk_sensor`, function (req,res) {
    usuarioController.statussensor(req,res);
});
router.get(`/variacao24/:fk_empresa/:fk_canteiro/:fk_sensor`, function (req,res) {
    usuarioController.variacao24(req,res);
});
router.get(`/buscaralertasdasemana/:fk_empresa/:fk_canteiro/:fk_sensor`, function (req,res) {
    usuarioController.buscaralertasdasemana(req,res);
});
router.get(`/atualizardadosdeumidade/:fk_empresa/:fk_canteiro/:fk_sensor`, function (req,res) {
    usuarioController.atualizardadosdeumidade(req,res);
});
router.get(`/buscardiaalerta/:fk_empresa/:fk_canteiro/:fk_sensor`, function (req,res) {
    usuarioController.buscardiaalerta(req,res);
});
router.post("/inserirlog", function (req, res) {
    usuarioController.inserirlog(req, res);
});
router.get(`/buscarultimolog`, function (req,res) {
    usuarioController.buscarultimolog(req,res);
});
router.get(`/obterdadosdeumidade/:fk_empresa/:fk_canteiro/:fk_sensor`, function (req,res) {
    usuarioController.obterdadosdeumidade(req,res);
});
module.exports = router;