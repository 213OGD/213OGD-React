import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import Resource from './components/Resources';
import { GET_FILES } from './queries/files.queries';
import { IS_AUTH } from './queries/users.queries';
import GET_TAGS from './queries/tags.queries';

const mocks = [
  {
    request: {
      query: GET_FILES,
    },
    result: {
      data: {
        files: [
          {
            id: '5fb78e83f608337cb309b76d',
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
  {
    request: {
      query: IS_AUTH,
      variables: {
        token: 'toto',
      },
    },
    result: {
      data: {
        getAuthPayload: {
          loggedIn: true,
          role: 'student'
        }

      },
    },
  },
  {
    request: {
      query: GET_TAGS,
    },
    result: {
      data: {
        tags: [
          {
            "name": "React"
          },
          {
            "name": "Node"
          },
          {
            "name": "JS"
          },
      ]
      }
    }
  }
];

describe('App', () => {
  it("test auth with good token & don't wait for datas", async () => {
    localStorage.setItem('odyssey213Token', 'toto');
    render(
      <MockedProvider mocks={mocks}>
        <Resource />
      </MockedProvider>
    );

    expect(screen.getByAltText('Workflow')).toBeInTheDocument();
  });

  it('test auth with good token & wait for datas', async () => {
    localStorage.setItem('odyssey213Token', 'toto');
    render(
      <MockedProvider mocks={mocks}>
        <Resource />
      </MockedProvider>
    );

    const listNode = await waitFor(() => screen.getByText('another test'));
    expect(listNode).toBeInTheDocument();
  });

  it('test local storage', () => {
    localStorage.setItem('item', 'test');
    expect(localStorage.getItem('item')).toBe('test');
    expect(localStorage.getItem.length).toBe(1);
  });
});
