/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import useTagSelection from '../hooks/useTagSelection';
import GET_FILES from '../queries/files.queries';
import CardFile, { DatasProps } from './CardFile';
import '../App.css';
import SideBar from './SideBar';
import { IS_AUTH } from '../queries/users.queries';

function Resources(): JSX.Element {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_FILES);
  const [authLoad, setAuthLoad] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const token = localStorage.getItem('token');
  const [reqAuth] = useMutation(IS_AUTH);

  async function checkAuth() {
    setAuthLoad(true);
    if (token === null) {
      history.push('/');
    }
    if (token) {
      try {
        const auth = await reqAuth({ variables: { token } });
        console.log(auth);
        console.log('isAuth', auth.data.getAuthPayload);
        setIsAuth(auth.data.getAuthPayload);
        setAuthLoad(false);
      } catch (err) {
        console.log('err', err.message);
        setIsAuth(false);
        setAuthLoad(false);
        history.push('/');
      }
    }
    setIsAuth(false);
    setAuthLoad(false);
  }

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
  ] = useTagSelection(data, loading);

  return authLoad ? (
    <h1>loading !!!</h1>
  ) : (
    <div className="container">
      <header className="w-full rounded-lg">
        <h1>213 Odyssey Google Drive</h1>
      </header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'stretch',
        }}
        className="container-cards rounded-xl p-8"
      >
        {loading && <h2>loading ...</h2>}
        {error && <h2>error</h2>}
        {displayTags && displayTags.length > 0 && (
          <div className="" style={{ width: '100vw' }}>
            <h3 className="">Tags</h3>
            {displayTags.map((tag: string) => (
              <div key={tag}>
                <input
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
                <label
                  htmlFor={tag}
                  style={{
                    margin: 4,
                    padding: 4,
                  }}
                >
                  {tag}
                </label>
              </div>
            ))}
          </div>
        )}
        {data &&
          data.files.map((file: JSX.IntrinsicAttributes & DatasProps) => {
            // eslint-disable-next-line react/jsx-props-no-spreading, no-underscore-dangle
            return isFileSelected(file.tags, selectedTags) === true ? (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <CardFile key={file._id} {...file} />
            ) : null;
          })}
      </div>
      <SideBar />
    </div>
  );
}

export default Resources;
