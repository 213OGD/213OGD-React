import React from 'react';
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
  return (
    <div>
      <h1>213 OGD</h1>
      {datas.map((data) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Card key={data.id} {...data} />
      ))}
    </div>
  );
}

export default App;
