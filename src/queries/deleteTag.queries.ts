import { gql } from '@apollo/client';

const DELETE_TAG = gql`
  mutation deleteTag($file: fileInput) {
    deleteTag(file: $file) {
      _id
      tags
    }
  }
`;

export default DELETE_TAG;
