import { gql } from '@apollo/client';

const GET_FILES = gql`
  query getFiles {
    files {
      _id
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
      _id
      name
      webViewLink
      iconLink
      tags
    }
  }
`;

export { GET_FILES, CREATE_OR_UPDATE };
