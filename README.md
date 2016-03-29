# PRÉ-REQUISITO/INFRA

* MongoDB
* Node.js
* Conexão Internet
* Editor de texto de preferência

# Instalação do MongoDB na plataforma Windows

A instalação do MongoDB no Windows não é algo trivial. Caso você não tenha 
conseguido instalá-lo, siga os passos a seguir. Eles foram testados no Windows 7:

### Baixando a versão correta

Na página `https://www.mongodb.org/downloads` você pode baixar um instalador específico para sua plataforma 32 bits ou 64 bits:

**VERSÃO 32 BITS**

https://nodejs.org/dist/v4.2.3/node-v4.2.3-x86.msi

**VERSÃO 64 BITS**

https://nodejs.org/dist/v4.2.3/node-v4.2.3-x64.msi

**ATENÇÃO: Não troque a pasta padrão do Node.js durante a instalação, a não ser que você saiba exatamente o que está fazendo**.

### Testando a instalação

Para testar, dentro da pasta `c:\mongodb\bin` execute o mongo shell através do comando `mongo`.