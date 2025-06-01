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
router.get(`/buscarcanteiros/:fk_empresa`, function (req,res) {
    usuarioController.buscarcanteiros(req,res);
});
router.get(`/buscarqtdsensores/:fk_empresa`, function (req,res) {
    usuarioController.buscarqtdsensores(req,res);
});
router.get(`/buscarumidade/:fk_empresa/:fk_canteiro/:fk_sensor`, function (req,res) {
    usuarioController.buscarumidade(req,res);
});
module.exports = router;