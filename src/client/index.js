import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './config/createApolloClient';

import App from './App';

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
