import Axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import Card, { DatasProps } from './components/Card';

const datas: DatasProps[] = [
  {
    id: '1',
    name: 'Backlog du POC',
    webViewLink:
      'https://docs.google.com/spreadsheets/d/1GBkzbQEGAU7lONfR_AQDPTde4-GodcfT_Xqb2-V6sUg/edit?usp=drivesdk',
    iconLink:
      'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.spreadsheet',
    tags: ['SCRUM', 'react', 'node'],
  },
  {
    id: '2',
    name: 'Test',
    webViewLink:
      'https://docs.google.com/spreadsheets/d/1GBkzbQEGAU7lONfR_AQDPTde4-GodcfT_Xqb2-V6sUg/edit?usp=drivesdk',
    iconLink:
      'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.spreadsheet',
    tags: ['SCRUM', 'react', 'node'],
  },
];

function App(): JSX.Element {
  const [files, setFiles] = useState<any[]>([]);

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
    <div>
      <h1>213 OGD</h1>
      {files.map((data) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Card key={data.id} {...data} />
      ))}
    </div>
  );
}

export default App;
