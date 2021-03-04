import React, { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import ADD_TAG from '../queries/addTag.queries';
function AddTag(props: any): JSX.Element {
  const [tag, setTag] = useState('');

  const { id } = props;

  const [
    addTagToBack,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_TAG);

  function formSubmission(e: FormEvent) {
    e.preventDefault();
    props.addTag(tag);

    addTagToBack({ variables: { file: { _id: id, tags: tag } } });

    // Reset Input after entrys
    setTag('');
  }

  return (
    <div>
      <form onSubmit={formSubmission}>
        <label htmlFor="tag-name">
          Ajouter un tag :&nbsp;
          <br />
          <input
            type="text"
            id="tag-name"
            name="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </label>
        <button type="submit">OK</button>
      </form>
    </div>
  );
}

export default AddTag;
