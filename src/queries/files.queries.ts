import { gql } from '@apollo/client';

const GET_FILES = gql`
  query getFiles {
    files {
      id
      googleId
      name
      iconLink
      webViewLink
      tags
    }
  }
`;

const CREATE_OR_UPDATE = gql`
  mutation createOrUpdate {
    createOrUpdate {
      id
      name
      webViewLink
      iconLink
      tags
    }
  }
`;

export { GET_FILES, CREATE_OR_UPDATE };
