# Banco de Dados - SmartBerry

Este repositório contém o esquema do banco de dados utilizado no projeto **SmartBerry**, um sistema de monitoramento da umidade do solo para o cultivo de morangos.  

## 📂 Estrutura do Banco  

- **Tabelas principais**:
  - `Cliente`: Cadastro dos usuarios clientes.
  - `Endereco`: Cadastro dos endereços referentes ao usuario cliente.
  - `Sensor`: Registra os sensores instalados e suas localizações.
  - `Registro`: Registra a coleta de dados levantados pelo sensor.

## 🚀 Tecnologias  

-   **Banco de dados**: MySQL 
<img
    align="center"
    alt="SQL"
    title="SQL"
    width="40px"
    style="padding-rigth: 10px;"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
/> 

## 📌 Como usar  
1. Clone este repositório  
2. Execute o script de criação do banco `\dbStructure.sql`
3. Execute o script de criação das tabelas `\dbStructure.sql`
4. Execute o script de insert default `\insertsMock.sql`
5. Execute o script de configuração do usuário `\userConfig.sql`
6. Execute a api ou insira dados 
  ```bash
  npm start
  ```
7. Execute um dos selects prontos ou sinta-se livre para criar um 

