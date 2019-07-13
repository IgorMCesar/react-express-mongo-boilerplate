import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './App';

const client = new ApolloClient({ uri: 'http://localhost:8080/graphql', credentials: 'include' });

function Root() {
  return (
    <div className="App container">
      <div className="jumbotron">
        <Router>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </Router>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
