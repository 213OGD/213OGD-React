import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Resources from './components/Resources';
import { IS_AUTH } from './queries/users.queries';

function App(): JSX.Element {
  const [reqAuth] = useMutation(IS_AUTH);
  const [isAuth, setIsAuth] = useState(false);

  const token = localStorage.getItem('token');
  console.log('auth', localStorage.getItem('token'));

  // async function checkAuth() {
  //   if (token === null) {
  //     setIsAuth(false);
  //     // history.push('/');
  //   }
  //   if (token) {
  //     try {
  //       const auth = await reqAuth({ variables: { token } });
  //       console.log(auth);
  //       console.log('isAuth', auth.data.getAuthPayload);
  //       setIsAuth(auth.data.getAuthPayload);
  //     } catch (error) {
  //       console.log('error', error.message);
  //       setIsAuth(false);
  //     }
  //   }
  //   setIsAuth(false);
  // }

  // function test() {
  //   checkAuth();
  //   return isAuth ? <Resources /> : <Redirect to="/" />;
  // }

  console.log('o', isAuth);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          {/* <Route path="/home" exact component={Resources} /> */}
          <Route path="/home" exact render={Resources} />
          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
