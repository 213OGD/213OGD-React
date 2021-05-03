import { gql } from '@apollo/client';

const ADD_TAG = gql`
  mutation addTag($args: tagInput) {
    addTag(tagInput: $args) {
      _id
      tags
    }
  }
`;

export default ADD_TAG;
