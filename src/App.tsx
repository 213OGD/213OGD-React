import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardFile, { DatasProps } from './components/CardFile';
import './App.css';

function App(): JSX.Element {
  const [files, setFiles] = useState<DatasProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios('http://localhost:5000/api/file/list');
        // eslint-disable-next-line no-console
        console.log(result.data.result);
        setFiles(result.data.result);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>213 Odyssey Google Drive</h1>
      </header>
      <div className="container-cards">
        {files.map((data) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <CardFile key={data.id} {...data} />
        ))}
      </div>
    </div>
  );
}

export default App;
