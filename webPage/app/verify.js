let tentativas = 0; 

function cadastro() {
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirma = document.getElementById('senhaconf').value;
    const estado = document.getElementById('Estado').value;

    const validacao =
        nome !== '' &&
        senha.length >= 8 &&
        email.includes('@') &&
        email.includes('.') &&
        senha === confirma &&
        cpf.length === 11 &&
        !email.startsWith('@') &&
        !email.endsWith('@') &&
        email.length > 7;

    if (validacao) {
        const usuario = {
            nome,
            cpf,
            email,
            senha,
            estado
        };

        localStorage.setItem('usuario', JSON.stringify(usuario));

        document.getElementById('verify').innerHTML =
            `<span style="color: green;">Cadastro realizado com sucesso!</span>`;
    } else {
        document.getElementById('verify').innerHTML =
            `<span style="color: red;">Insira dados válidos.</span>`;
    }
}

function login() {
    const emailLogin = document.getElementById('email').value.trim();
    const senhaLogin = document.getElementById('senha').value;
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    const loginCorreto =
        (usuarioSalvo && usuarioSalvo.email === emailLogin && usuarioSalvo.senha === senhaLogin) ||
        (emailLogin === 'smartberry@sptech.school' && senhaLogin === 'admin@123');

    if (loginCorreto) {
        alert("Login realizado com sucesso!");
        window.location.href = "dashboard.html";
    } else {
        tentativas++;
        alert(`Email ou senha inválidos. Tentativa ${tentativas} de 3.`);

        if (tentativas >= 3) {
            alert("Você errou a senha mais de 3 vezes. Redirecionando para a página inicial.");
            window.location.href = "index.html";
        }
    }
}