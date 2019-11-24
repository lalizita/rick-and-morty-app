import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import configureStore from './store/store';
import Home from './pages/Home.jsx';
import Characters from './pages/Characters.jsx';


const store = createStore(configureStore, applyMiddleware(thunk))
console.log(store)

function App(props) {
  return (
    <Router>
      <Provider store={store}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/characters">
              <Characters />
            </Route>
          </Switch>
      </Provider>
      </Router>
  );
}

export default App;