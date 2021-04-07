import React, { FormEvent, useState } from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import './App.css';
import POST_LOG from './queries/users.queries';

function App(): JSX.Element {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const [flashMessage, setFlashMessage] = useState('');

  const [logs] = useMutation(POST_LOG);

  function handleSuccess(
    res: FetchResult<any, Record<string, any>, Record<string, any>>
  ) {
    console.log('res', res);
    if (res.data.login === null) {
      setFlashMessage("L'utilisateur n'existe pas.");
    } else {
      setFlashMessage('');

      localStorage.setItem('token', res.data.login.token);
      localStorage.setItem('username', res.data.login.user.username);
      localStorage.setItem('id', res.data.login.user.id);
      localStorage.setItem('auth', 'true');

      setFlashMessage(
        `Connexion réussie ! Bienvenue ${res.data.login.user.username}`
      );
    }
  }

  function handleError(err: any) {
    // console.log('err', err);
    if (err === 'Error: Wrong Password!') {
      setFlashMessage('Mauvais mot de passe');
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
      logs({ variables: { mail, password } }).then(
        (res) => handleSuccess(res),
        (err) => handleError(err)
      );
      setMail('');
      setPassword('');
    }
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

export default App;
