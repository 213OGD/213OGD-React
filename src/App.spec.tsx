import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import GET_FILES from './queries/files.queries';

const mocks = [
  {
    request: {
      query: GET_FILES,
    },
    result: {
      data: {
        files: [
          {
            _id: '5fb78e83f608337cb309b76d',
            googleId: '1-xTxMVK719c7I0alIBzxdwnX6LxKIJxfUzajMLQTt7Q',
            name: 'another test',
            iconLink:
              'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document',
            webViewLink:
              'https://docs.google.com/document/d/1-xTxMVK719c7I0alIBzxdwnX6LxKIJxfUzajMLQTt7Q/edit?usp=drivesdk',
            tags: ['React', 'Node', 'JS'],
          },
        ],
      },
    },
  },
];

describe('App', () => {
  it('Apollo runs the mocked query & useQuery state is loading', () => {
    render(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );

    expect(screen.getByText('loading ...')).toBeInTheDocument();
  });

  it('runs the mocked query & useQuery success with datas', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    const listNode = await waitFor(() => screen.getByText('another test'));
    expect(listNode).toBeInTheDocument();
  });
});
