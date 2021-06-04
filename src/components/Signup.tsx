import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../queries/users.queries';

export default function Signup(): JSX.Element {
  const history = useHistory();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [flashMessage, setFlashMessage] = useState('');

  const [signup] = useMutation(SIGNUP);

  async function signupSubmission(e: FormEvent) {
    e.preventDefault();

    if (username === '' || mail === '' || password === '') {
      if (username === '') setFlashMessage('Veuillez saisir un identifiant');
      else if (mail === '') setFlashMessage('veuillez saisir un email');
      else if (password === '')
        setFlashMessage('veuillez saisir un mot de passe');
    } else {
      setFlashMessage('');

      try {
        const res = await signup({ variables: { username, mail, password } });
        console.log(res);
        localStorage.setItem('token', res.data.addUser.token);
        localStorage.setItem('username', res.data.addUser.user.username);
        // eslint-disable-next-line no-underscore-dangle
        localStorage.setItem('id', res.data.addUser.user._id);
        history.push('/home');
      } catch (error) {
        setFlashMessage(error.message);
        // console.log('error', error);
      }
    }
  }

  return (
    <>
      <h1>Signup</h1>
      <form className="mt-8 space-y-6" onSubmit={signupSubmission}>
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
            <label htmlFor="user">
              <input
                type="text"
                name="user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-100 placeholder-gray-400 focus:placeholder-gray-200 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-300 focus:border-red-400 focus:z-10 sm:text-sm"
                placeholder="User name"
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
      </form>
    </>
  );
}
