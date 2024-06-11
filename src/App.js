import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router -dom';
import Join from './join/join';

function App() {
  return (
    <Router>
      <Switch>
        <Route path = "/join" component = {Join} />
        <Route></Route>
        <Route></Route>
      </Switch>
    </Router>
  );
}

export default App;
