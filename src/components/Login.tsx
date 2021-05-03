import React, { FormEvent, useState } from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import '../App.css';
import POST_LOG from '../queries/users.queries';

function Login(): JSX.Element {
  const history = useHistory();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const [flashMessage, setFlashMessage] = useState('');

  const [logs] = useMutation(POST_LOG);

  async function handleSuccess(
    res: FetchResult<any, Record<string, any>, Record<string, any>>
  ) {
    console.log('res', res);
    if (res.data.login === null) {
      setFlashMessage("L'utilisateur n'existe pas.");
    } else {
      setFlashMessage('');

      localStorage.setItem('token', res.data.login.token);
      localStorage.setItem('username', res.data.login.user.username);
      // eslint-disable-next-line no-underscore-dangle
      localStorage.setItem('id', res.data.login.user._id);

      setFlashMessage(
        `Connexion réussie ! Bienvenue ${res.data.login.user.username}`
      );

      history.push('/home');
    }
  }

  async function loginSubmission(e: FormEvent) {
    e.preventDefault();

    if (mail === '' || password === '') {
      if (mail === '') setFlashMessage('Veuillez saisir un email');
      else if (password === '')
        setFlashMessage('Veuillez saisir un mot de passe');
    } else {
      setFlashMessage('');
      // console.log(mail, password);
      try {
        const res = await logs({ variables: { mail, password } });
        handleSuccess(res);
      } catch (error) {
        // console.log('error', error.message);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        error.message === 'Wrong Password!'
          ? setFlashMessage('Mauvais mot de passe')
          : setFlashMessage(error.message);
      }
    }

    setMail('');
    setPassword('');
  }

  return (
    <div className="login-page">
      <div>
        <h1>Google Drive 213</h1>
        <form onSubmit={loginSubmission}>
          <p>
            <label htmlFor="mail">
              Email :&nbsp;
              <input
                type="text"
                name="mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label htmlFor="password">
              Mot de passe :&nbsp;
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </p>
          {flashMessage !== '' && <p>{flashMessage}</p>}
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
