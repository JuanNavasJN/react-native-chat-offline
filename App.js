import React from 'react';
import main from './src/reducers/main';
import colors from './src/reducers/colors';
import Index from './src/index';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import Services from './src/services/index';

//-----------------------  GraphQL ---------------------------------------------

import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';

import {ApolloProvider} from '@apollo/react-hooks';

const cache = new InMemoryCache();

const API_ENDPOINT_URI = 'http://192.168.1.101:8080';
// const API_ENDPOINT_URI = 'https://chatjnback-bright-mandrill-qt.mybluemix.net';

const link = new HttpLink({
  uri: API_ENDPOINT_URI,
});

const client = new ApolloClient({
  cache,
  link,
});

//--------------------------------------------------------------------

const reducer = combineReducers({
  main,
  colors,
});

const store = createStore(reducer);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Services />
        <Index />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
