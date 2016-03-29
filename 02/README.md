Temos nosso servidor Express rodando com as rotas `/palestrantes` e `/eventos` configuradas. Chegou a hora de prepararmos o terreno para nosso cliente em Angular. 

## EXERCÍCIO 2

Todas as bibliotecas e dependências do Angular 2 são baixadas através do `npm` que vem com a instalação do `Node.js`. Sendo assim, ter a plataforma Node instalada é condição fundamental para criar uma aplicação com o novo framework. Isso não é problema para nós, já que estamos criando nosso backend também em Node.js.

Para sua comodidade, todas as dependências já estão listadas no arquivo `public/package.json`, baixadas em `public/node_modules` e importadas em `public/index.html`. Inclusive temos carregado a biblioteca `System.js` responsável em garantir o suporte ao sistema de módulos do ES6, que utilizaremos em nossa aplicação. Contudo, será necessário instalar o TypeScript em sua plataforma.

## PASSO 1 (INSTALAÇÃO DO TYPESCRIPT)

Instale o TypeScript em sua plataforma. Para isso, abra seu terminal favorito e vá até a pasta `public` e execute o comando:

```
npm install typescript@1.7.5 --save-dev
```

O TypeScript já vem com um transpiler de ES6 para ES5. O que isso significa? Significa que escreveremos todos nosso código usando o que há de mais modernos do ES6 e exclusividade do TypeScript em arquivos `.ts` e no final o transpiler do TypeScript converterá todo o código em ES5 com a extensão `.js`.

Resumindo: o que importaremos em `index.html` será o resultado da compilação dos arquivos `.ts`. Não se preocupe, TypeScript vem com um servidor de compilação em tempo real. Toda vez que editarmos um arquivo `.ts` ele gerará no mesmo diretório seu arquivo `.js`. 

Certifique-se que o servidor esteja rodando e abra um segundo terminal. Nele, vá até a pasta `public` e rode o comando:

```
npm start
```

Isso dispará o servidor de compilação do TypeScript que monitorará todos os arquivos da pasta `public`. Qualquer alteração resultará na compilação dos nossos arquivos `.ts`. O comando `npm start` executará por debaixo dos panos o comando ``npm run tsc:w`.

Com o servidor de pé e o servidor do TypeScript rodando podemos começar pelo nosso primeiro componente, aquele que consumirá nossa API de palestrantes exibindo-os em uma tabela para nós.


## PASSO 2

Vamos criar o arquivo `public/app/principal/components/principal.ts`:

```
import {Component} from 'angular2/core';

@Component({
	selector: 'principal',
	templateUrl: 'app/principal/components/principal.html'
})
export class Principal {}
```

Criar um componente em Angular começa sempre a partir da definição de uma classe com o decorator `@Component` que a caracteriza como um componente. Duas configurações são importantes.

**selector**: indica como referenciaremos nosso componente em templates
**templateUrl**: indica o arquivo .html com a marcação que será utilizada para renderizar o componente.

Vamos criar o template do nosso componente em `public/app/principal/components/principal.html`:

```
<-- public/app/principal/components/principal.html -->

<div class="jumbotron text-center">
    <h1>Workshop MEAN</h1>
</div>
<div class="container">
    {{palestrantes}}
</div>
```

## PASSO 3

Veja que nosso template tem uma lacuna criada através e uma **Angular Expression (AE)**. Este é um tipo de associação de dados (data binding) unidirecional que vai da fonte de dados para a view e nunca ao contrário. No entanto, onde nosso template encontrará os dados de que precisa? No seu contexto, isto é, o componente `Principal`. Vamos adiciona a propriedade `palestrantes` em nossa classe que contém uma lista de palestrantes:

```
// public/app/principal/components/principal.ts

import {Component} from 'angular2/core';

@Component({
	selector: 'principal',
	templateUrl: 'app/principal/components/principal.html'
})
export class Principal {
		
	palestrantes = [
		{"nome": "Flávio Almeida", "palestra" : "MEAN"},
		{"nome" : "Zeca Baleiro",  "palestra" : "Angular"},
		{"nome" : "Tião Galinha",  "palestra" : "Mongo"}
    ];
}
```

Excelente! Verifique se em `public/principal/` foi criado o arquivo `principal.js`, resultado da compilação em tempo real do nosso arquivo `principal.js`. 


## PASSO 4

Temos nosso primeiro componente pronto, mas onde o exibiremos? Vamos alterar `public/index.html` e adicionar a tag `<principal>Carregando...</principal>`, ou seja, estamos utilizando o seletor do nosso componente:

```
<!-- public/index.html -->

<!DOCTYPE html>
<html lang="pt-br">
<head>
	<!-- código anterior omitido -->
</head>
<body>
	<principal>Carregando...</principal>
</body>
</html>
```

Isso ainda não é suficiente. Precisamos realizar o boot da nossa aplicação. Isso significa que Angular precisa saber qual será o componente ponto de entrada da aplicação, em nosso caso, `Principal`. 


## PASSO 5

Vamos criar o arquivo **public/boot.ts**:

```
// public/boot.ts

///<reference path="node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {Principal} from './app/principal/components/principal';

bootstrap(Principal);
```

Veja que importamos `bootstrap`, o responsável em carregar o primeiro componente da nossa aplicação. Quando `Principal` for carregado, `bootstrap` procurará seu selector em `index.html` para renderizar nosso componentes naquela posição.

Mas quem carregará `boot.js`? A biblioteca `System.js`, é por isso em em `index.html` já uma TAG script que solicita a biblioteca que carregue `boot.js`.

Veja quem com essa solução, não precisamos importar os scripts dos nossos componentes, pois todos serão baixados automaticamente pelo sistema de módulos que estamos utilizando.

Agora, basta vermos o resultado abrindo nosso navegador no endereço:

```
http://localhost:3000
```

Nada interessante, vemos a saída:

```
[object Object],[object Object],[object Object]
```

## PASSO 6

Não queremos exibir o array, mas o nome e a palestra de cada palestrante da lista.

Podemos melhorar ainda mais apresentação da nossa lista:

```
<-- public/app/principal/components/principal.html -->

<div class="jumbotron text-center">
    <h1>Workshop MEAN</h1>
</div>
<div class="container">
  <table class="table table-bordered table-striped">
    <tr *ngFor="#palestrante of palestrantes">
        <td>{{palestrante.nome}}</td>
        <td>{{palestrante.palestra}}</td>
    </tr>
  </table>
</div>
```

Usamos a diretiva `ngFor`. Esta diretiva percorrerá a lista `palestrantes` e parada cada item da lista criará uma nova linha em nossa tabela, exibindo o nome do palestrante e sua palestra. 
Veja o resultado. Uma tabela com o nome do palestrante e sua tabela devem ser exibidos.
      
