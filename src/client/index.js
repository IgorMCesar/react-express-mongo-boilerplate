import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import client from './config/createApolloClient';
import store from './config/createStore';

import App from './App';

const Root = () => {
  return (
    <div className="App container">
      <div className="jumbotron">
        <Provider store={store}>
          <Router>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </Router>
        </Provider>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
