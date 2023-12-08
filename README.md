# projeto17-shortly

# Shortly

Este projeto é uma aplicação de back-end que encurta urls de sites, vídeos, imagens e afins. Nesta aplicação, é possível usar o site através de requisições HTTP(s) seguindo a convenção REST.

# Demo
[https://apostas-api-vkrt.onrender.com]()

# Como funciona?

Este projeto é uma API REST para atender a aplicação de apostas em jogos esportivos. Ela possui quatro entidades: `signup`, `signin`, `urls` e `ranking`.

Para entidade, foram criadas cinco rotas:

- **POST `/signup`:** Cria 
- **POST `/signin`:** Cria 
- **POST `/urls/shorten`:** Cria 
- **GET `/urls/:id`:** 
- **GET `/urls/open/:shortUrl`:** 
- **Delete `/urls/:id`:** 
- **GET `/users/me`:** 
- **GET `/ranking`:** 

estrutura esperada para um jogo específico é:
```
{
	id: number;
	createdAt: string;
	updatedAt: string;
	homeTeamName: string;
	awayTeamName: string;
	homeTeamScore: number;
	awayTeamScore: number;
	isFinished: boolean;
	bets: {
		id: number;
		createdAt: string;
		updatedAt: string;
		homeTeamScore: number;
		awayTeamScore: number;
		amountBet: number; 
		gameId: number; 
		participantId: number;
		status: string; 
		amountWon: number || null; 
	}[]
}
```

# Motivação
Este projeto foi feito para praticar a construção de uma API REST usando o ecossistema Node e Express junto com as tecnologias TypeScript e Prisma.


# Tecnologias utilizadas
Para este projeto, foram utilizadas:

- Node (versão 18.17.0);
- Express;
- TypeScript;
- Prisma;
- Postgres;
- Jest e Supertest;
- Joi;
- http-status


# Como rodar em desenvolvimento
Para executar este projeto em desenvolvimento, é necessário seguir os passos abaixo:

- Clonar o repositório;
- Baixar as dependências necessárias com o comando: `npm install`;
- Em seguida, criar o arquivo `.env` com base no `.env.example`;
- Para poder executar os testes, será necessário criar um outro arquivo `.env.test` com base no `.env.example`;
- Este arquivo `.env` é composto pelas seguintes propriedades:
```
    DATABASE_URL="postgresql://postgres..."
```
- A propriedade `DATABASE_URL` é usada para fazer a conexão com o banco de dados.

- Será necessário executar o Prisma para criar o banco de dados e as tabelas necessárias. Para isso, execute o comando: `npx prisma migrate dev`;
- Para rodar o projeto em desenvolvimento, execute o comando `npm run dev`;
- Testes manuais podem ser feitos através do Thunder Client.