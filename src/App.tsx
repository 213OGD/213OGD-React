import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Resources from './components/Resources';
import Signup from './components/Signup';
import Error404 from './components/Error404';

function App(): JSX.Element {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Resources} />
          <Route path="/signup" exact component={Signup} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
