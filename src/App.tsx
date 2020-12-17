import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import GET_FILES from './queries/files.queries';
import CardFile, { DatasProps } from './components/CardFile';
import './App.css';

function App(): JSX.Element {
  const [files, setFiles] = useState<DatasProps[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await Axios('http://localhost:5000/api/file/list');
  //       // eslint-disable-next-line no-console
  //       console.log(result.data.result);
  //       setFiles(result.data.result);
  //     } catch (error) {
  //       // eslint-disable-next-line no-console
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const datas = [
  //   {
  //     id: '1',
  //     name: 'Backlog du POC',
  //     webViewLink:
  //       'https://docs.google.com/spreadsheets/d/1GBkzbQEGAU7lONfR_AQDPTde4-GodcfT_Xqb2-V6sUg/edit?usp=drivesdk',
  //     iconLink:
  //       'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.spreadsheet',
  //     tags: ['SCRUM', 'react', 'node'],
  //   },
  //   {
  //     id: '2',
  //     name: 'Test',
  //     webViewLink:
  //       'https://docs.google.com/spreadsheets/d/1GBkzbQEGAU7lONfR_AQDPTde4-GodcfT_Xqb2-V6sUg/edit?usp=drivesdk',
  //     iconLink:
  //       'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.spreadsheet',
  //     tags: ['SCRUM', 'react', 'node'],
  //   },
  // ];

  const { loading, error, data } = useQuery(GET_FILES);

  console.log(process.env.REACT_APP_URI, 'FILES');

  return (
    <div className="container">
      <header>
        <h1>213 Odyssey Google Drive</h1>
      </header>
      <div className="container-cards">
        {loading && <h1>loading ...</h1>}
        {error && <h1>error</h1>}
        {data &&
          data.files.map((file: JSX.IntrinsicAttributes & DatasProps) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <CardFile key={file.id} {...file} />
          ))}
      </div>
    </div>
  );
}

export default App;
