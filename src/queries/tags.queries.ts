import { gql } from '@apollo/client';

const GET_TAGS = gql`
  query getTags {
    tags {
      name
    }
  }
`;

export default GET_TAGS;

export const DELETE_TAG = gql`
  mutation deleteTag($args: tagInput) {
    deleteTag(tagInput: $args) {
      file {
        _id
        tags
      }
      tags {
        name
      }
    }
  }
`;

export const ADD_TAG = gql`
  mutation addTag($args: tagInput) {
    addTag(tagInput: $args) {
      file {
        _id
        tags
      }
      tags {
        name
      }
    }
  }
`;
