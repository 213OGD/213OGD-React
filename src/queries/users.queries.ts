import { gql } from '@apollo/client';

const POST_LOG = gql`
  mutation postLog($mail: String!, $password: String!) {
    login(mail: $mail, password: $password) {
      user {
        _id
        username
      }
      token
    }
  }
`;

export default POST_LOG;

export const IS_AUTH = gql`
  mutation getPayload($token: String!) {
    getAuthPayload(token: $token)
  }
`;
