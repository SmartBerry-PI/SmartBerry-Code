const xInput = document.getElementById("ipt_x");

const buttonCadastrar = document.getElementById("button-cadastro");

const respostaX = document.getElementById("x_errorText");

let verifyX;

xInput.addEventListener("input", 
    function () {
        const x = xInput.value;
        verifyX = (verificação aqui)
        colorInputBorder(ipt_x, x, verifyX);
        exibirMensagemErro(0, x, respostaX);
    }
);

function colorInputBorder(ipt, value, verify) {
    if (value == '') {
        ipt.style.borderColor = 'black';
    } else if (verify) {
        ipt.style.borderColor = 'green';
    } else {
        ipt.style.borderColor = 'red';
    };
    mudarButton();
}

function mudarButton() {
    if (verifyX) {
        buttonCadastrar.setAttribute("onclick", "cadastrar()")
    } else {
        buttonCadastrar.setAttribute("onclick", "aviso()")
    }
}

function exibirMensagemErro(listIndex, value, tagResposta) {    
    const listErrorMsg = {
        verify: [verifyX],
        mensagem: [
            "A verificação de X é assim e assado",
        ]
    };

    tagResposta.innerHTML = '';
    if (!listErrorMsg.verify[listIndex] && value != '') {
        tagResposta.innerHTML = listErrorMsg.mensagem[listIndex];
    };
}