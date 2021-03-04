import { gql } from '@apollo/client';

const ADD_TAG = gql`
  mutation addTag($file: fileInput) {
    updateTag(file: $file) {
      _id
      tags
    }
  }
`;

export default ADD_TAG;
