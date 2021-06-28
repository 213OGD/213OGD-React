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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <img
          className="mx-auto h-20 w-auto animate-pulse"
          src="https://avatars.githubusercontent.com/u/8874047?s=280&v=4"
          alt="Workflow"
        />
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-500">
          Google Drive 213
        </h1>
        <p className="mt-2 text-center text-gray-600">Continue your journey</p>
        <form className="mt-8 space-y-6" onSubmit={loginSubmission}>
          <div className="rounded-lg shadow-xl -space-y-px">
            <div>
              <label htmlFor="mail">
                <input
                  type="text"
                  name="mail"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-100 placeholder-gray-400 focus:placeholder-gray-200 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-300 focus:border-red-400 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-100 placeholder-gray-400 focus:placeholder-gray-200 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-300 focus:border-red-400 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center text-red-600 animate-bounce">
            {flashMessage !== '' && <p>{flashMessage}</p>}
          </div>
          <button
            className="group relative w-full transition duration-500 ease-in-out flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-red-400 hover:text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200 transition-shadow"
            type="submit"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-white group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Sign in
          </button>
          <button
            className="group relative w-full transition duration-500 ease-in-out flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-red-400 hover:text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200 transition-shadow"
            type="submit"
            onClick={() => history.push('/signup')}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
