import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

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

  return authLoad ? (
    <h1>loading !!!</h1>
  ) : (
    <div className="container">
      <header>
        <h1>213 Odyssey Google Drive</h1>
        <button type="button" onClick={disconnect}>
          LogOut
        </button>
      </header>
      <div className="container-cards">
        {loading && <h2>loading ...</h2>}
        {error && <h2>error</h2>}
        {data &&
          data.files.map((file: JSX.IntrinsicAttributes & DatasProps) => (
            // eslint-disable-next-line react/jsx-props-no-spreading, no-underscore-dangle
            <CardFile key={file._id} {...file} />
          ))}
      </div>
      <SideBar />
    </div>
  );
}

export default Resources;
