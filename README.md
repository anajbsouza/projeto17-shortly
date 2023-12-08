# Shortly

Este projeto é uma aplicação de back-end que encurta urls de sites, vídeos, imagens e afins. Nesta aplicação, é possível usar o site através de requisições HTTP(s) seguindo a convenção REST.


# Demo
[https://apostas-api-vkrt.onrender.com]()

# Como funciona?

A API possui quatro entidades: `signup`, `signin`, `urls` e `ranking`. Elas servem para criar usuários, autenticá-los e fazer o encurtamento de urls.

Para entidade, foram criadas cinco rotas:

- **POST `/signup`:** Cria o usuário
- **POST `/signin`:** Cria sessão do usuário
- **POST `/urls/shorten`:** Rota autenticada que recebe a url do usuário
- **GET `/urls/:id`:** Pega informações de uma url específica
- **GET `/urls/open/:shortUrl`:** Redireciona o usuário para o link correspondente
- **Delete `/urls/:id`:** Deleta uma url específica 
- **GET `/users/me`:** Retorna os dados do usuário atrelado ao token
- **GET `/ranking`:** Retorna dados armazenados no banco de dados da forma que está abaixo:

```js
[
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 5,
		"visitCount": 100000
	},
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 3,
		"visitCount": 85453
	},
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 10,
		"visitCount": 0
	},
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 0,
		"visitCount": 0
	}
]
```

# Tecnologias utilizadas
Para este projeto, foram utilizadas:

- Node.js
- bcrypt
- cors
- dotenv
- express
- joi
- nanoid
- nodemon
- pg
- uuid


# Como rodar em desenvolvimento
Para executar este projeto em desenvolvimento, é necessário seguir os passos abaixo:

- Clonar o repositório;
- Baixar as dependências necessárias com o comando: `npm install`;
- Em seguida, criar o arquivo `.env` com base no `.env.example`;
- Este arquivo `.env` é composto pelas seguintes propriedades:
```
    DATABASE_URL="postgresql://postgres..."
    NODE_ENV=production
```
- A propriedade `DATABASE_URL` é usada para fazer a conexão com o banco de dados.
- Para rodar o projeto em desenvolvimento, execute o comando `npm run dev`;
- Testes manuais podem ser feitos através do Thunder Client.