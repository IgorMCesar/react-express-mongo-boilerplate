import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import client from './config/createApolloClient';
import configureStore, { history } from './config/configureStore';

import App from './App';

const store = configureStore();
const Root = () => {
  return (
    <div className="App container">
      <div className="jumbotron">
        <Provider store={store}>
          <Router>
            <ApolloProvider client={client}>
              <App history={history} />
            </ApolloProvider>
          </Router>
        </Provider>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<Root />, rootElement);
