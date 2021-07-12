import React from 'react';
import { useHistory } from 'react-router-dom';
import SignHeader from './SignHeader';

export default function Error404() {
  const history = useHistory();

  return (
    <div className="flex flex-col h-screen justify-center">
      <SignHeader />
      <div className="text-center">
        <button
          className="group relative transition duration-500 ease-in-out justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-red-400 hover:text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-red transition-shadow"
          type="button"
          onClick={() => history.push('/home')}
        >
          Retour à l&apos;accueil ?
        </button>
      </div>
    </div>
  );
}
