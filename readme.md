#Sistema de agendamento de reuniões - Front End

## Como rodar a aplicação

Pré requisitos:

* Node.js 12.3.1 ou superior
* NPM 6.9.0 ou superior

Faça um clone desse repositório.

Rode `npm install` para instalar as dependências.

Entre na pasta raiz da aplicação e rode `npm run serve`.

No console você já vai ter a porta onde a aplicação está rodando.

### Esta aplicação depende do backend para rodar!!!

## Sobre a aplicação

Esta aplicação foi feita para rodar com Vanilla JS (javascript puro).

Ela é um SPA que simula um comportamento parecido com os frameworks que trabalham dessa forma.
Claro que não tem virtual DOM e é um projeto simples.

Fiz ela sem o overhead do jQuery.

Para isso, ela tem algumas coisas bem específicas:

* Um router que verifica o padrão da URL para renderizar um componente
* Componentes ES6 que renderizam a view baseado num template HTML 5
* Um CSS bem simples, apenas para exemplificar algumas coisas que posso fazer com CSS