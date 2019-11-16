import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './store';
import Home from './pages/Home.jsx';
import Characters from './pages/Characters.jsx';

function App(props) {
  return (
    <Router>
      <Provider store={configureStore()}>
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