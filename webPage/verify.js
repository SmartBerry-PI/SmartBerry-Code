function cadastro() {
    const nome = document.getElementById('nome')
    const cpf = document.getElementById('cpf')
    const email = document.getElementById('email')
    const senha = document.getElementById('senha')
    const confirma = document.getElementById('senhaconf')
    const validacao = nome && senha.length >= 8 && email.includes('@') && email.includes('.') && senha == confirma && cpf.length == 14 && email != '@' && email != '@.' && email != '.@' && email.length > 7
    
    if (validacao) {
        document.getElementById('verify').innerHTML = `<span style="color: green;">Cadastro realizado com sucesso!</span>`
        
    } else {document.getElementById('verify').innerHTML = `<span style="color: red;">Insira dados válidos.</span>`}
}

