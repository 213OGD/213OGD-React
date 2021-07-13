/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import useTagSelection from '../hooks/useTagSelection';
import { GET_FILES, CREATE_OR_UPDATE } from '../queries/files.queries';
import CardFile, { DatasProps } from './CardFile';
import '../App.css';
import { IS_AUTH } from '../queries/users.queries';

import logo from '../images/Drive-Logo.png';
import GET_TAGS from '../queries/tags.queries';
import Loader from './Loader';

function Resources(): JSX.Element {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_FILES);
  const { loading: loadingTags, error: errorTags, data: dataTags } = useQuery(
    GET_TAGS
  );
  const [authLoad, setAuthLoad] = useState(false);
  const [role, setRole] = useState('');
  const [updateTagList, setUpdateTagList] = useState<string[]>([]);

  const token = localStorage.getItem('odyssey213Token');
  const username = localStorage.getItem('username');
  const [isAuth] = useMutation(IS_AUTH);
  const [gDrive] = useMutation(CREATE_OR_UPDATE, {
    refetchQueries: () => [{ query: GET_FILES }],
  });

  useEffect(() => {
    async function checkAuth() {
      if (token === null) {
        history.push('/');
      }
      if (token) {
        try {
          const auth = await isAuth({ variables: { token } });
          if (auth.data.getAuthPayload.loggedIn) {
            setRole(auth.data.getAuthPayload.role);
            setAuthLoad(true);
          } else {
            history.push('/');
          }
        } catch (err) {
          setAuthLoad(false);
          history.push('/');
        }
      }
    }
    checkAuth();
  }, []);

  function disconnect() {
    localStorage.removeItem('odyssey213Token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    history.push('/');
  }

  async function getData(): Promise<any> {
    const driveData = await gDrive();
    return driveData;
  }

  const [
    displayTags,
    selectedTags,
    tagSelection,
    isFileSelected,
  ] = useTagSelection(dataTags, loadingTags, updateTagList);

  // return (
  return !authLoad ? (
    <Loader />
  ) : (
    <div className="mx-auto">
      <header className="flex items-center justify-between mx-auto bg-wild bg-cover h-32 shadow-lg">
        <div className="flex flex-col items-center pl-6">
          <img className="h-12 xl:h-14" src={logo} alt="logo OGD 213" />
          <h1 className="font-mono text-white">Odyssey X Google Drive</h1>
          <h2 className="text-gray-700 font-semibold">213</h2>
        </div>
        <div className="text-white font-semibold">
          {username && `Bienvenue ${username}`}
          <button
            className="text-white hover:text-red-400 hover:bg-gray-100 text-sm text-center rounded-md px-2 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline font-semibold"
            type="button"
            onClick={disconnect}
          >
            Se déconnecter
          </button>
        </div>
      </header>
      <div className="mx-auto">
        {loading && <Loader />}
        {error && <h2>Une erreur est survenue...</h2>}
        {displayTags && displayTags.length > 0 && (
          <div className="flex flex-row flex-wrap items-center pl-5 2xl:pl-6">
            {role === 'teacher' && (
              <button
                type="button"
                className="rounded-full nm-convex-gray-300 active:nm-inset-gray-300 px-1 py-0.5 mr-3"
                onClick={getData}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-refresh px-1 py-1 active:animate-spin-r"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#f87171"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                </svg>
              </button>
            )}
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
        <div className="mx-auto container py-12 px-2">
          <div className="grid place-content-between sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grids-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 5xl:grid-cols-10 gap-4 2xl:gap-3 justify-between">
            {data &&
              data.files.map((file: JSX.IntrinsicAttributes & DatasProps) => {
                const fileRole = { ...file, role };
                return isFileSelected(file.tags, selectedTags) === true ? (
                  <CardFile
                    key={file.id}
                    {...fileRole}
                    onReturnTags={(newTagList) => setUpdateTagList(newTagList)}
                  />
                ) : null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
