<img src="https://user-images.githubusercontent.com/5064518/62132713-f3c25480-b2b3-11e9-9bb2-8447432ac980.png" alt="react boilerplate banner" align="center" />

<br />

MER(A)N is a FullStack webapp boilerplate based on a MERN stack with Apollo GraphQL.

<br>

<div align="center">
  <img src="https://cdn.iconscout.com/icon/free/png-256/mongodb-5-1175140.png" height="75">
  <img src="https://cdn.iconscout.com/icon/free/png-256/express-8-1175029.png" height="75">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/512px-React.svg.png" height="75">
  <img src="https://media.licdn.com/dms/image/C4E0BAQE19TrEXW022w/company-logo_200_200/0?e=2159024400&v=beta&t=KSA1haVf2zqXDG5scvlmrXltTNA3MkkLLQpolQrTBTU" height="75">
  <img src="https://nodejs.org/static/images/logo-hexagon-card.png" height="75">
</div>

<br />

<div align="center">
  <a href="https://img.shields.io/codefactor/grade/github/IgorMCesar/react-express-mongo-boilerplate">
    <img alt="CodeFactor Grade" src="https://img.shields.io/codefactor/grade/github/IgorMCesar/react-express-mongo-boilerplate">
  </a>
  <a href="https://img.shields.io/david/dev/IgorMCesar/react-express-mongo-boilerplate">
    <img alt="David" src="https://img.shields.io/david/dev/IgorMCesar/react-express-mongo-boilerplate?label=root%20dev%20dependencies">
  </a>
  <a href="https://img.shields.io/david/IgorMCesar/react-express-mongo-boilerplate?label=client%20dependencies&path=src/client">
    <img alt="David Client Dependencies" src="https://img.shields.io/david/IgorMCesar/react-express-mongo-boilerplate?label=client%20dependencies&path=src/client">
  </a>
  <a href="https://img.shields.io/david/dev/IgorMCesar/react-express-mongo-boilerplate?label=client%20dependencies&path=src/client">
    <img alt="David Client Dev Dependencies" src="https://img.shields.io/david/dev/IgorMCesar/react-express-mongo-boilerplate?label=client%20dev%20dependencies&path=src/client">
  </a>
  <a href="https://img.shields.io/david/IgorMCesar/react-express-mongo-boilerplate?label=client%20dependencies&path=src/server">
    <img alt="David Server Dependencies" src="https://img.shields.io/david/IgorMCesar/react-express-mongo-boilerplate?label=server%20dependencies&path=src/server">
  </a>
  <a href="https://img.shields.io/david/dev/IgorMCesar/react-express-mongo-boilerplate?label=client%20dependencies&path=src/server">
    <img alt="David Server Dev Dependencies" src="https://img.shields.io/david/dev/IgorMCesar/react-express-mongo-boilerplate?label=server%20dev%20dependencies&path=src/server">
  </a>
</div>

<hr />
<br />

## Features
**Server**

[![Known Vulnerabilities](https://snyk.io/test/github/IgorMCesar/react-node-boilerplate/badge.svg?targetFile=src/server/package.json)](https://snyk.io/test/github/IgorMCesar/react-node-boilerplate)
* [x] **[Node.JS](https://nodejs.org)** v10.x.x
* [x] **[Express](https://github.com/expressjs/express)**
* [x] **[GraphQL](http://graphql.org/)** with [Apollo Server Express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express)
* [x] **[MongoDB](https://www.mongodb.com/)** with [Mongoose](https://github.com/Automattic/mongoose)
* [x] [Express Session](https://github.com/expressjs/session)
* [x] [Body Parser](https://github.com/expressjs/body-parser)
* [x] [NodeMailer](https://github.com/nodemailer/nodemailer)
* [x] [Helmet](https://github.com/helmetjs/helmet)
* [x] [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
* [x] [Morgan](https://github.com/expressjs/morgan)
* [x] [Joi](https://github.com/hapijs/joi)
* [x] [Chalk](https://github.com/chalk/chalk)


**Client**

[![Known Vulnerabilities](https://snyk.io/test/github/IgorMCesar/react-node-boilerplate/badge.svg?targetFile=src/client/package.json)](https://snyk.io/test/github/IgorMCesar/react-node-boilerplate)
#### TODO
* React
* Redux
* Redux Thunk
* Router
* Webpack
* Babel
* Ant Design
* Jest
* i18n
* Normalizr
* GraphQL
* Yup

## Getting Started

### Prerequisites

Start by cloning this repository locally with `git clone https://github.com/IgorMCesar/react-node-boilerplate.git`

Make sure you have node installed.

### Installing

Then Install all npm packages:

```
cd .\react-node-boilerplate
npm install
```

Now lets create our environment variables. open `.env.example` and use it to create your own `.env` file.
I used https://cloud.mongodb.com/ to ser up my MongoDB, but you can user whatever you like.

## Running React Node Boilerplate
### Development

To run React Node Boilerplate using development configs run:
```
npm run dev
```

### Production

To run the React Node Boilerplate using production configs run:
```
npm run start
```

## Deployment

Make sure you didn't forget any sensitive information in your code, remeber to always use `.env` file for that!!!

To deploy the React Node Boilerplate you need to set all your environment variables on the PaaS platform of your choice.

Set the starting script to:
```
npm run start
```
(If you are deploying to Heroku, there is no need for this step, heroku already uses start as default)

## Authors

* **Igor Cesar** - *Initial work*

