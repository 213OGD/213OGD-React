import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Resources from './components/Resources';

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Resources} />
          {/* <Route path="/home" exact render={Resources} /> */}
          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
