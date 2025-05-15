let tentativas = 0; 


const nomeInput = document.getElementById("ipt_nome");
const sobrenomeInput = document.getElementById("ipt_sobrenome");
const usernameInput = document.getElementById("ipt_username");
const emailInput = document.getElementById("ipt_email");
const cpfInput = document.getElementById("ipt_cpf");
const telefoneInput = document.getElementById("ipt_telefone");
const senhaInput = document.getElementById("ipt_senha");
const confirmarSenhaInput = document.getElementById("ipt_confirmar");
const buttonCadastrar = document.getElementById("button-cadastro");
const resposta = document.getElementById("verify_msg");

let verifyNome;
let verifySobrenome;
let verifyUsername;
let verifyEmail;
let verifyCpf;
let verifyTelefone;
let verifySenha;
let verifyConfirma;

nomeInput.addEventListener("input", 
    function () {
        const nome = nomeInput.value;
        verifyNome = ((nome != '') && (nome.length <= 45) && (nome.length >= 4) && !(/[^(a-z0-9)\s]/iu.test(nome)))
        colorInputBorder(ipt_nome, nome, verifyNome);
        exibirMensagemErro(0, nome);
    }
);
sobrenomeInput.addEventListener("input", 
    function () {
        const sobrenome = sobrenomeInput.value;
        verifySobrenome = ((sobrenome != '') && (sobrenome.length <= 45) && (sobrenome.length >= 4) && !(/[^(a-z0-9)\s]/iu.test(sobrenome)))
        colorInputBorder(sobrenomeInput, sobrenome, verifySobrenome);
        exibirMensagemErro(1, sobrenome);
    }
);
usernameInput.addEventListener("input", 
    function () {
        const username = usernameInput.value
        verifyUsername = ((username != '') && (username.length <= 45) && (username.length >= 5) && !(/[^(a-z0-9)(_\-.)]/u.test(username)));
        colorInputBorder(usernameInput, username, verifyUsername);
        exibirMensagemErro(2, username);
    }
);
emailInput.addEventListener("input", 
    function () {
        const email = emailInput.value
        verifyEmail = ((email != '') && (email.length <= 45) && !(/[^(a-z0-9)(@_\-.)]/iu.test(email)) && email.includes('.com') && email.includes('@'))
        colorInputBorder(emailInput, email, verifyEmail);
        exibirMensagemErro(3, email);
    }
);
cpfInput.addEventListener("input", 
    function () {
        const cpf = cpfInput.value
        verifyCpf = ((cpf != '') && (cpf.length == 11) && !(/[^(0-9)]/iu.test(cpf)))
        colorInputBorder(cpfInput, cpf, verifyCpf);
        exibirMensagemErro(4, cpf);
    }
);
telefoneInput.addEventListener("input", 
    function () {
        const telefone = telefoneInput.value
        verifyTelefone = ((telefone != '') && (telefone.length <= 45) && !(/[^(0-9)(/(/)-.)]/u.test(telefone)))
        colorInputBorder(telefoneInput, telefone, verifyTelefone);
        exibirMensagemErro(5, telefone);
    }
);
senhaInput.addEventListener("input", 
    function () {
        const senha = senhaInput.value
        verifySenha = ((senha != '') && (senha.length <= 20) && (senha.length >= 8))
        colorInputBorder(senhaInput, senha, verifySenha);
        exibirMensagemErro(6, senha);
    }
);
confirmarSenhaInput.addEventListener("input", 
    function () {
        const confirma = confirmarSenhaInput.value;
        const senha = senhaInput.value
        verifyConfirma = (confirma == senha)
        colorInputBorder(confirmarSenhaInput, confirma, verifyConfirma);
        exibirMensagemErro(7, confirma);
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
    if (verifyNome && verifyUsername && verifyEmail && verifySenha && verifyConfirma) {
        buttonCadastrar.setAttribute("onclick", "cadastrar()")
    } else {
        buttonCadastrar.setAttribute("onclick", "aviso()")
    }
}

function exibirMensagemErro(listIndex, value) {    
    const listErrorMsg = {
        verify: [verifyNome, verifySobrenome, verifyUsername, verifyEmail, verifyCpf, verifyTelefone, verifySenha, verifyConfirma],
        mensagem: [
            "O nome deve ter entre 4 e 45 caracteres alfanuméricos",
            "O sobrenome deve ter entre 4 e 45 caracteres alfanuméricos",
            "Seu apelido deve ter entre 5 e 45 caracteres alfanuméricos minúsculos, nenhum espaço e pode incluir (_-.)",
            "O email deve ter entre 4 e 45 caracteres alfanuméricos, @ e (.com)",
            "Seu cpf deve ter exatamente 11 números",
            "Seu telefone deve ter até 45 números e pode incluir caracteres de separação",
            "A senha deve ter no mínimo 8 e no máximo 20 caracteres",
            "Senhas não correspondem"
        ]
    };

    resposta.innerHTML = '';

    for (let i = 0; i <= listIndex; i++) {
        if (!listErrorMsg.verify[i] && value != '') {
            resposta.innerHTML = listErrorMsg.mensagem[i];
        };
    };
}
// const nome = document.getElementById('nome').value.trim();
// const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
// const email = document.getElementById('email').value.trim();
// const senha = document.getElementById('senha').value;
// const confirma = document.getElementById('senhaconf').value;
// const estado = document.getElementById('Estado').value;

// const validacao =
//     nome !== '' &&
//     senha.length >= 8 &&
//     email.includes('@') &&
//     email.includes('.') &&
//     senha === confirma &&
//     cpf.length === 11 &&
//     !email.startsWith('@') &&
//     !email.endsWith('@') &&
//     email.length > 7;

// if (validacao) {
//     const usuario = {
//         nome,
//         cpf,
//         email,
//         senha,
//         estado
//     };

//     localStorage.setItem('usuario', JSON.stringify(usuario));

//     document.getElementById('verify').innerHTML =
//         `<span style="color: green;">Cadastro realizado com sucesso!</span>`;
// } else {
//     document.getElementById('verify').innerHTML =
//         `<span style="color: red;">Insira dados válidos.</span>`;
// }


function login() {
    const emailLogin = document.getElementById('email').value.trim();
    const senhaLogin = document.getElementById('senha').value;
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const loginCorreto =
        (usuarioSalvo && usuarioSalvo.email === emailLogin && usuarioSalvo.senha === senhaLogin) ||
        (emailLogin === 'cliente' && senhaLogin === 'cliente123');

    if (loginCorreto) {
        alert("Login realizado com sucesso!");
        window.location.href = "perfil.html";
    } else {
        tentativas++;
        alert(`Email ou senha inválidos. Tentativa ${tentativas} de 3.`);

        if (tentativas >= 3) {
            alert("Você errou a senha mais de 3 vezes. Redirecionando para a página inicial.");
            window.location.href = "index.html";
        }
    }
}