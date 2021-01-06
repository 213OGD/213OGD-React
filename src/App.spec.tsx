import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';
import GET_FILES from './queries/files.queries';

const mocks = [
  {
    request: {
      query: GET_FILES,
    },
    result: {
      data: {
        files: {
          _id: '5fb78e83f608337cb309b76d',
          googleId: '1-xTxMVK719c7I0alIBzxdwnX6LxKIJxfUzajMLQTt7Q',
          name: 'another test',
          iconLink:
            'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document',
          webViewLink:
            'https://docs.google.com/document/d/1-xTxMVK719c7I0alIBzxdwnX6LxKIJxfUzajMLQTt7Q/edit?usp=drivesdk',
          tags: ['React', 'Node', 'JS'],
        },
      },
    },
  },
];

describe('App', () => {
  it('renders without error', () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );

    const tree = component.root.findByType('h2');
    expect(tree.children.join('')).toContain('loading ...');

    // A tester : toBeInDocument

    // const tree = component.toJSON();
    // expect(tree.children).toContain('Loading...');
  });

  // it('renders with success', async () => {
  //   const component = TestRenderer.create(
  //     <MockedProvider mocks={mocks}>
  //       <App />
  //     </MockedProvider>
  //   );

  //   await new Promise((resolve) => setTimeout(resolve, 0));

  //   // heading

  //   const tree = component.root.findByType('h3');
  //   expect(tree.children.join('')).toContain('Tags :');
  // });
});
