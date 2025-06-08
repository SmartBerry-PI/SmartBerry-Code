var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var usuario = req.body.usuarioServer;
    var senha = req.body.senhaServer;

    if (usuario == undefined) {
        res.status(400).send("Seu usuario está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(usuario, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                            id: resultadoAutenticar[0].idUsuario,
                            nome: resultadoAutenticar[0].nome,
                            sobrenome: resultadoAutenticar[0].sobrenome,
                            username: resultadoAutenticar[0].username,
                            telefonecelular: resultadoAutenticar[0].telefoneCelular,
                            cpf: resultadoAutenticar[0].cpf,
                            email: resultadoAutenticar[0].email

                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }

            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}
function autenticarCodigo(req, res) {
    var codigo = req.body.codigoServer;

    if (codigo == undefined) {
        res.status(400).send("Seu codigo está undefined!");
    } else {

        usuarioModel.autenticarCodigo(codigo)
            .then(
                function (resultadoAutenticarcodigo) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticarcodigo.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticarcodigo)}`); // transforma JSON em String

                    if (resultadoAutenticarcodigo.length == 1) {
                        console.log(resultadoAutenticarcodigo);

                        res.json({
                            idEmpresa: resultadoAutenticarcodigo[0].IdEmpresa

                        });

                    } else if (resultadoAutenticarcodigo.length == 0) {
                        res.status(403).send("Código de acesso inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }

            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cpf = req.body.cpfServer;
    var telefone = req.body.telefoneServer;
    var username = req.body.usernameServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (username == undefined) {
        res.status(400).send("Seu username está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, sobrenome, email, senha, cpf, telefone, username)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function buscarcanteiros(req, res) {
    var fk_empresa = req.params.fk_empresa;
    if (fk_empresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    }
    else {
        usuarioModel.buscarcanteiros(fk_empresa)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }

}
function buscarqtdsensores(req, res) {
    var fk_empresa = req.params.fk_empresa;
    if (fk_empresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        usuarioModel.buscarqtdsensores(fk_empresa)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }

}
function buscarumidade(req, res) {
    var fk_empresa = req.params.fk_empresa;

    if (fk_empresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        usuarioModel.buscarumidade(fk_empresa)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }

}
function statussensor(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var fk_canteiro = req.params.fk_canteiro;
    var fk_sensor = req.params.fk_sensor;

    if (fk_empresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else if (fk_sensor == undefined) {
        res.status(400).send("Seu fkSensor está undefined!");
    } else if (fk_canteiro == undefined) {
        res.status(400).send("Seu fk_canteiro está undefined!");
    } else {
        usuarioModel.statussensor(fk_empresa, fk_canteiro, fk_sensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }

}
function variacao24(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var fk_canteiro = req.params.fk_canteiro;
    var fk_sensor = req.params.fk_sensor;

    if (fk_empresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else if (fk_sensor == undefined) {
        res.status(400).send("Seu fkSensor está undefined!");
    } else if (fk_canteiro == undefined) {
        res.status(400).send("Seu fk_canteiro está undefined!");
    } else {
        usuarioModel.variacao24(fk_empresa, fk_canteiro, fk_sensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }

}
function buscaralertasdasemana(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var fk_canteiro = req.params.fk_canteiro;
    var fk_sensor = req.params.fk_sensor;

    if (fk_empresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else if (fk_sensor == undefined) {
        res.status(400).send("Seu fkSensor está undefined!");
    } else if (fk_canteiro == undefined) {
        res.status(400).send("Seu fk_canteiro está undefined!");
    } else {
        usuarioModel.buscaralertasdasemana(fk_empresa, fk_canteiro, fk_sensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }

}
function inserirlog(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var id = req.body.id;
    var idE = req.body.idE;
    var log_acesso_id = req.body.log_acesso_id;

    // Faça as validações dos valores
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else if (idE == undefined) {
        res.status(400).send("Seu idE está undefined!");
    } else if (log_acesso_id == undefined) {
        res.status(400).send("Seu log_acesso_id está undefined!");
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.inserirlog(id, idE, log_acesso_id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function buscarultimolog(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html


        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.buscarultimolog()
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    
}
function buscardiaalerta(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var fk_canteiro = req.params.fk_canteiro;
    var fk_sensor = req.params.fk_sensor;

    if (fk_empresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else if (fk_sensor == undefined) {
        res.status(400).send("Seu fkSensor está undefined!");
    } else if (fk_canteiro == undefined) {
        res.status(400).send("Seu fk_canteiro está undefined!");
    } else {
        usuarioModel.buscardiaalerta(fk_empresa, fk_canteiro, fk_sensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }

}
function obterdadosdeumidade(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var fk_canteiro = req.params.fk_canteiro;
    var fk_sensor = req.params.fk_sensor;

    if (fk_empresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else if (fk_sensor == undefined) {
        res.status(400).send("Seu fkSensor está undefined!");
    } else if (fk_canteiro == undefined) {
        res.status(400).send("Seu fk_canteiro está undefined!");
    } else {
        usuarioModel.obterdadosdeumidade(fk_empresa, fk_canteiro, fk_sensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }

}
function atualizardadosdeumidade(req, res) {
    var fk_empresa = req.params.fk_empresa;
    var fk_canteiro = req.params.fk_canteiro;
    var fk_sensor = req.params.fk_sensor;

    if (fk_empresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else if (fk_sensor == undefined) {
        res.status(400).send("Seu fkSensor está undefined!");
    } else if (fk_canteiro == undefined) {
        res.status(400).send("Seu fk_canteiro está undefined!");
    } else {
        usuarioModel.atualizardadosdeumidade(fk_empresa, fk_canteiro, fk_sensor)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }

}
function buscarAlertas(req, res) {
    var fk_empresa = req.params.id_empresa;

    if (fk_empresa == undefined) {
        res.status(400).send("Seu fkEmpresa está undefined!");
    } else {
        usuarioModel.buscarAlertas(fk_empresa)
            .then(
                function (resultado) {
                    res.json(resultado)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }

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
}