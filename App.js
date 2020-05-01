import React from 'react';
import main from './src/reducers/main';
import Index from './src/index';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import Services from './src/services/index';

const reducer = combineReducers({
  main,
});

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <Services />
      <Index />
    </Provider>
  );
};

export default App;
