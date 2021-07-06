/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import useTagSelection from '../hooks/useTagSelection';
import GET_FILES from '../queries/files.queries';
import CardFile, { DatasProps } from './CardFile';
import '../App.css';
import SideBar from './SideBar';
import { IS_AUTH } from '../queries/users.queries';

import logo from '../images/Drive-Logo.png';
import GET_TAGS from '../queries/tags.queries';

function Resources(): JSX.Element {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_FILES);
  const { loading: loadingTags, error: errorTags, data: dataTags } = useQuery(
    GET_TAGS
  );
  const [authLoad, setAuthLoad] = useState(false);

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [reqAuth] = useMutation(IS_AUTH);

  useEffect(() => {
    async function checkAuth() {
      if (token === null) {
        history.push('/');
      }
      if (token) {
        try {
          const auth = await reqAuth({ variables: { token } });
          // console.log(auth);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          auth.data.getAuthPayload.loggedIn
            ? setAuthLoad(true)
            : history.push('/');
        } catch (err) {
          console.log('err', err.message);
          setAuthLoad(false);
          history.push('/');
        }
      }
      // setAuthLoad(false);
    }
    checkAuth();
  }, []);

  // console.log(process.env.REACT_APP_URI, 'FILES', data);
  function disconnect() {
    localStorage.clear();
    history.push('/');
  }

  const [
    displayTags,
    selectedTags,
    tagSelection,
    isFileSelected,
  ] = useTagSelection(data, loading, dataTags, loadingTags);

  // return (
  return !authLoad ? (
    <>
      <h1>loading ...</h1>
    </>
  ) : (
    <div className="mx-auto">
      <header className="flex items-center justify-between mx-auto bg-wild bg-cover h-32 shadow-lg">
        <div className="flex flex-col items-center pl-6">
          <img className="h-12 xl:h-14" src={logo} alt="logo OGD 213" />
          <h1 className="font-mono text-white">Odyssey Google Drive</h1>
          <h2 className="text-gray-700 font-semibold">213</h2>
        </div>
        <div className="text-white font-semibold">
          {username && `Hello ${username}`}
          <button
            className="text-white hover:text-red-400 hover:bg-gray-100 text-sm text-center rounded-md px-2 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline font-semibold"
            type="button"
            onClick={disconnect}
          >
            LogOut
          </button>
        </div>
      </header>
      <div className="p-6">
        {loading && <h2>loading !!!</h2>}
        {error && <h2>error </h2>}
        {displayTags && displayTags.length > 0 && (
          <div className="flex flex-row flex-wrap items-center">
            <h3 className="pl-4 pr-4 ">Tags :</h3>
            {displayTags.map((tag: string) => (
              <div
                key={tag}
                className={`transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  m-2 p-2 xl:my-6 rounded-md border-2 border-transparent border-red-400 font-semibold
                ${
                  selectedTags.findIndex(
                    (tagName: string) =>
                      tagName.toLowerCase() === tag.toLowerCase()
                  ) !== -1
                    ? 'bg-red-400 text-white'
                    : 'bg-white text-red-400'
                }`}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  name={tag.toLowerCase()}
                  value={tag.toLowerCase()}
                  id={tag}
                  onChange={(e) => tagSelection(e)}
                  checked={
                    selectedTags.findIndex(
                      (tagName: string) =>
                        tagName.toLowerCase() === tag.toLowerCase()
                    ) !== -1
                  }
                />
                <label htmlFor={tag} className="p-2 px-3">
                  {tag}
                </label>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-row flex-wrap">
          {data &&
            data.files.map((file: JSX.IntrinsicAttributes & DatasProps) => {
              // eslint-disable-next-line react/jsx-props-no-spreading, no-underscore-dangle
              return isFileSelected(file.tags, selectedTags) === true ? (
                <CardFile
                  key={file._id}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...file}
                  onReturnTags={(e: any) => console.log('hey', e)}
                />
              ) : null;
            })}
        </div>
      </div>
    </div>
  );
}

export default Resources;
