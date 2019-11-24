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
import Locations from './pages/Locations.jsx';
import Episodes from './pages/Episodes.jsx';

const store = createStore(configureStore, applyMiddleware(thunk))

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
            <Route exact path="/locations">
              <Locations />
            </Route>
            <Route exact path="/episodes">
              <Episodes />
            </Route>
          </Switch>
      </Provider>
      </Router>
  );
}

export default App;