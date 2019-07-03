# React Node Boilerplate

#### :construction: Work in progress!!! :construction:
React Node Boilerplate is a MERN stack with GraphQL.

## React Node Boilerplate includes:

* React
* Redux
* Redux Thunk
* Webpack
* Babel
* Chalk
* Morgan
* Body-parser
* GraphQL
* Helmet
* Joi
* Mongoose
* Express-session
* Lodash
* Bcryptjs

## React Node Boilerplate will include:
* Ant Design
* i18next
* Jest
* Normalizr
* Router
* Node-mailer

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

