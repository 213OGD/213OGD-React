import React from 'react';
import { useQuery } from '@apollo/client';
import GET_FILES from './queries/files.queries';
import CardFile, { DatasProps } from './components/CardFile';
import './App.css';
import SideBar from './components/SideBar';

function App(): JSX.Element {
  const { loading, error, data } = useQuery(GET_FILES);
  const tags = [
    { id: 1, name: 'GraphQL' },
    { id: 2, name: 'JS' },
    { id: 3, name: 'Express' },
  ];

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="container">
      <header>
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
        className="container-cards"
      >
        {loading && <h2>loading ...</h2>}
        {error && <h2>error</h2>}
        {tags && tags.length > 0 && (
          <div style={{ width: '100vw', backgroundColor: 'yellow' }}>
            Tags :
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => console.log(tag)}
                style={{
                  margin: 4,
                  padding: 4,
                  backgroundColor: `${getRandomColor()}`,
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}

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
