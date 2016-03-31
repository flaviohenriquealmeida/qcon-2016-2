
**IMPORTANTE**: em seu terminal de preferência, dentro desta pasta, baixe todas as dependências do projeto do backend através do comando `npm install` antes de continuar. Em seguida, dentro da pasta `public` execute também `npm install` para baixar as dependências do cliente (Angular2).

# EXERCÍCIO 5

Precisamos preparar o terreno para integrar nosso servidor com o MongoDB. Nosso primeiro passo será adicionar alguns palestrantes através do mongo shell. 

Com o MongoDB devidamente instalado, dentro do terminal do seu sistema operacional favorito, chame o Mongo Shell:

```
mongo
```

O Mongo Shell será carregado com a mensagem:

```
MongoDB shell version: 3.0.3
connecting to: test
```

## PASSO 1

Por padrão, estamos conectados com o baco `test`. Vamos nos conectar no banco `workshop`, caso ele não existe, o MongoDB o criará automaticamente:

### a)
```
use workshop
```

Se digitarmos `db` teclando ENTER logo em seguida, o nome do nosso banco será exibido no console. Agora `db` é um atalho para nosso banco.

### b)
O Mongo Shell é compatível com a linguagem JavaScript. Vamos criar uma variável que representa um palestrante no formato JSON:

```
palestrante = {"nome" : "Rayson", "palestra" : "perdendo peso"}
```

### c)
Agora precisamos salvar este palestrante, mas em qual "tabela"? Bem, o MongoDB não trabalha com tabelas, mas com **collections** que não possuem esquemas. Vamos criar a collection `palestrantes` acessando-a como se fosse uma propriedade de `db`. Em seguida, a partir da collection, chamaremos a função `insert` que recebe nosso palestrante gravando-o na collection `palestrantes`:

```
db.palestrantes.insert(palestrante)
```

### d)
Excelente, agora vamos alterar nosso palestrante adicionando-o mais uma vez na collection `palestrantes`:

```
palestrante = {"nome" : "Shall", "palestra" : "ganhando peso"}
db.palestrantes.insert(palestrante)
```

### e)
Temos dois palestrantes gravados. Como listá-los? Fazemos isso através da função `find`:

```
db.palestrantes.find()
```

Agora que já aprendemos incluir e a listar palestrantes, vamos alterar nosso servidor para retornar a lista de participantes do Banco no lugar de retornar uma lista estática.

## PASSO 2

Precisamos criar uma conexão entre nosso servidor e o MongoDB. Vamos criar o arquivo `config/database.js`:

```
// config/database.js

var mongoose = require('mongoose');

module.exports = function(uri) {

    mongoose.connect('mongodb://' + uri, { server: { poolSize: 15 }});
    
    mongoose.connection.on('connected', function () {
      console.log('Mongoose! Connectado em ' + uri);
    });

    mongoose.connection.on('error',function (err) {
      console.log('Mongoose! Erro na conexão: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose! Desconectado de ' + uri);
    });

    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Mongoose! Desconectado pelo término aplicação');
        process.exit(0);
      });
    });
}
```

O código anterior cria um módulo que aceita como parâmetro da URL de conexão para o banco. Além disso, preparamos uma resposta para os eventos `conneted` e `disconneted`. O primeiro nos indicará quando a nossa conexão for efetivada e o segundo quando ela for fechada. 

## PASSO 3

**Altere** `server.js` e carregue o módulo `database.js` passando como parâmetro o endereço do MongoDB (localhost) e o nome do banco que queremos nos conectar (workshop). Seu `server.js` deve ficar assim:

```
var http = require('http')
    ,app = require('./config/express');

// novidade!
require('./config/database')('localhost/workshop');

http.createServer(app)
    .listen(3000, function() {
        console.log('Server is running');
        console.log('http://localhost:3000');
    });
```
Faça um teste, parando seu servidor iniciando-o logo em seguida. A string `Mongoose! Connectado em localhost/workshophttp://localhost` deve ser exibida.

## PASSO 4

Apesar do MongoDB ser Schemaless, isso não quer dizer que esquemas não sejam importantes, a grande questão é que eles são responsabilidades da aplicação. Criaremos nosso primeiro esquema que representa um palestrante com auxílio do Mongoose:

**Crie** o arquivo **app/models/palestrante.js**.

```
var mongoose = require('mongoose');

// cria o esquema
var schema = mongoose.Schema({
  nome: { 
    type: String, 
    required: true
  }, 
  palestra: {
    type: String, 
    required: true
  }
});

// compila o modelo com base no esquema
mongoose.model('Palestrante', schema);
```

## PASSO 5

Precisamos usar o modelo `Palestrante` em nossa API, mas como? Precisamos alterar consign para que carregue primeiro todos os módulos da pasta `models` para em seguida carregar nossa API.

**Altere** `config/express.js`, a linha que chama a função `consign` deve ficar assim:

```
consign({cwd: 'app'})
  .include('models')
  .then('api')
  .into(app);

```


## PASSO 6

Essa pequena alteração carregará o módulo `alurapic/app/models/palestrante.js` para nós, fazendo com que o mongoose registre o modelo para nós. Uma vez registrado, podemos acessá-lo de qualquer lugar do nosso sistema através do mongoose. Diferente do que fizemos com a API, não acessaremos o modelo através de `app.models.palestrate`, mas através do mongoose:
```
// app/api/palestrante.js

var mongoose = require('mongoose');

module.exports = function(app) {
    
    // models é a pasta e palestrante é o nome do arquivo js
    var Palestrante = mongoose.model('Palestrante');
    
    app.route('/palestrantes')
        .get(function(req, res) {
            Palestrante
                .find()
                .then(function(palestrantes) {
                    res.json(palestrantes);     
                });
        });
};
```

Depois de tanta alterações, reinicie o servidor e acesse o endereço da aplicação. Os dados cadastrados devem ser exibidos por nosso cliente Angular.
