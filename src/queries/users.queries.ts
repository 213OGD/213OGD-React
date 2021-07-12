import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation login($mail: String!, $password: String!) {
    login(mail: $mail, password: $password) {
      user {
        _id
        username
      }
      token
    }
  }
`;

export default LOGIN;

export const IS_AUTH = gql`
  mutation getPayload($token: String!) {
    getAuthPayload(token: $token) {
      loggedIn
      role
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($username: String!, $mail: String!, $password: String!) {
    addUser(user: { username: $username, mail: $mail, password: $password }) {
      user {
        _id
        username
        mail
      }
      token
    }
  }
`;
