# PRÉ-REQUISITO/INFRA

* MongoDB
* Node.js
* Conexão Internet
* Editor de texto de preferência

# Instalação do MongoDB na plataforma Windows

A instalação do MongoDB no Windows não é algo trivial. Caso você não tenha 
conseguido instalá-lo, siga os passos a seguir. Eles foram testados no Windows 7:

### Baixando a versão correta

Na página `https://www.mongodb.org/downloads` baixe a versão compatível com seus sistema operacional (32bits ou 64bits), mas a versão `zip`. 

### Renomeie a pasta

Descompacte o arquivo para a raiz do seu sistema operacional, normalmente `c:\`. No final, renomeie a pasta para `c:\mongodb`.

### Criando o diretório que armazenará nossos bancos

Em seguida, crie o diretório `c:\data\db`, também na raiz do sistema de arquivos. É dentro desta pasta que ficarão armazenados os banco de dados criados pelo MongoDB.

### Registrando o MongoDB como serviço

O próximo passo será registrar o MongoDB como um serviço em seu sistema operacional, ou seja, toda vez que você reiniciar sua máquina ele será carregado automaticamente pelo Windows. 

Abra o terminal **como administrador** e entre dentro da pasta`c:\mongodb\bin`. Nela, execute o seguinte comando:

```
mongod --dbpath=C:\mongodb --logpath=C:\mongodb\log.txt --install
```

Agora, ainda no terminal, execute o comando:

```
services.msc
```

Este comando abrirá o painel de serviços do Windows. Busque a linha que exibe o serviço `MongoDB` que acabamos de adicionar. Clique com o botão direito no nome do serviço e escolha a opção `iniciar`. Pronto!

### Testando a instalação

Para testar, dentro da pasta `c:\mongodb\bin` execute o mongo shell através do comando `mongo`.