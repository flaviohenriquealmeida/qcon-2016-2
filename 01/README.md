
**IMPORTANTE**: em seu terminal de preferência, dentro desta pasta, baixe todas as dependências do projeto do backend através do comando `npm install` antes de continuar. Em seguida, dentro da pasta `public` execute também `npm install` para baixar as dependências do cliente (Angular2).

# EXERCÍCIO - 1

Nosso projeto possui a seguinte estrutura:

```
server.js -> inicializa nosso servidor que recebe uma instância do Express
config
    express.js -> centraliza as configurações do Express
public
    index.html -> Página principal da aplicação
```

## PASSO 1

Inicie seu servidor, para isso, dentro da pasta 01, utilize o comando:

```
npm start
```

Nosso servidor inicializa, mas a instância do Express passada para nosso servidor ainda não foi devidamente configurada. Por exemplo, ainda não somos capazes de acessar o arquivo `index.html` dentro da pasta `public`, algo fundamental para o cliente em Angular que faremos. 

Para que possamos compartilhar arquivos estáticos, precisamos adicionar e configurar um middleware na configuração do Express.

## PASSO 2

Altere o arquivo **01/config/express.js** e adicione o middleware `express-static` para tornar acessível a pasta `public` com todos os seus arquivos para o navegador:

```
// 01/config/express.js

var express = require('express');
var app = express();

// novidade: configurando o express static
app.use(express.static('public'));

module.exports = app;
```

Será necessário parar o servidor (CONTROL + C, COMMAND + C) e reiniciá-lo novamente para que as alterações surtam efeito.

## PASSO 3

Experimente acessar o endereço `http://localhost:3000`. Como já temos a página `01/public/index.html`, a mensagem `Workshop MEAN deve ser exibida.

Temos um servidor web que apenas compartilha arquivos estáticos, mas isso não é suficiente. Precisamos criar alguns endpoints REST que serão consumidos pelo cliente Angular que ainda faremos.

## PASSO 4

Vamos seguir a seguinte convenção: nossos endpoints ficarão todos dentro da pasta `app/api`, inclusive já temos o `app/api/palestrantes.js` que configura a rota `/palestrantes` que retorna uma lista de palestrantes.

Nosso problema é que o Express ainda não está ciente deste endpoint, alguém precisa carregá-lo. Uma maneira de fazermos isso é através do modulo `consign`. Podemos indicar para este módulo a pasta `app/api` e todas as novas API's que forem adicionadas serão carregadas automaticamente sem qualquer outro tipo de configuração (você ainda precisará reiniciar o servidor).

**Edite** o arquivo `config/express.js` importando e configurando o `consign`. Seu arquivo `config/express.js` deve ficar assim:

```
// 02/config/express.js

var express = require('express');

// importa o módulo consign
var app = express()
    ,consign = require('consign');

app.use(express.static('public'));

// configura o consign
consign({cwd: 'app'})
    .include('api')
    .into(app);

module.exports = app;

```

A configuração `{cwd: 'app'}` indica a raíz na qual o `consign` procurará os demais diretórios para carregamento de módulos.

Isso ainda não é suficiente, precisamos entrar dentro da pasta que contém nosso arquivo server.js e instalar o consign:

```
npm install consign --save
```
## PASSO 5

Agora que você configurou o expres-load, já pode subir o servidor com `npm start` e acessar a URL `http://localhost:3000/palestrantes` que 
retornará um JSON com uma lista de palestrantes.

## PASSO 6

Estamos acessando um endpoint que foi registrado no Express, mas isso não vale, ele já estava criado! Vamos criar um novo endpoint!

Crie o arquivo **app/api/eventos.js**. Como estamos usando o `expres-load` ele carregará o arquivo quando o servidor for reiniciado, mas é claro, precisamos configurar o novo arquivo primeiro.

## PASSO 7

No início do arquivo `eventos.js`, crie uma lista de eventos. Usaremos dados estáticos por enquanto, mais tarde aprendemos a obter esses dados do MongoDB:

```
// 02/app/api/eventos.js

var eventos = [
    {"nome" : "Workshop MEAN"},
    {"nome" : "Workshop Angular"},
];
```

Agora que já temos nossa lista, precisamos criar um módulo do Node.js 
que configurará o endpoint `/eventos`. Ele deve retornar uma lista de eventos. 

Fazemos isso através de `app.route` da instância do Express recebida 
como parâmetro.

```
// 02/app/api/eventos.js

var eventos = [
    {"nome" : "Workshop MEAN"},
    {"nome" : "Workshop Angular"},
];

module.exports = function(app) {
    
    app.route('/eventos')
        .get(function(req, res) {
            res.json(eventos);
        });
};
```
 O objeto `app.route` possui uma função para cada verbo HTTP, em nosso caso, estamos interessados em lidar para requisições do tipo `GET` quando a URL `/eventos` for acessada, por isso usamos uma função de mesmo nome. Esta função recebe como parâmetro um callback que será executado quando a requisição for executada, retornando como resposta um JSON com os dados dos eventos. O próprio objeto que apresenta o fluxo de resposta já possui o a função `json` que sabe lidar com essa estrutura de dados.

## PASSO 8

Depois de reiniciar o servidor, experimente acessar a URL `http://localhost:3000/eventos`. Os dados dos eventos devem ser exibidos em seu navegador.