import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import GET_FILES from './queries/files.queries';
import CardFile, { DatasProps } from './components/CardFile';
import './App.css';
import SideBar from './components/SideBar';

function App(): JSX.Element {
  const { loading, error, data } = useQuery(GET_FILES);

  // console.log(process.env.REACT_APP_URI, 'FILES', data);

  return (
    <div className="container">
      <header>
        <h1>213 Odyssey Google Drive bla </h1>
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

export default App;
