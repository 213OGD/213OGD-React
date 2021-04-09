/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import ADD_TAG from '../queries/addTag.queries';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function AddTag(props: any): JSX.Element {
  const [tag, setTag] = useState('');

  const { id } = props;

  const [
    addTagToBack,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_TAG);

  function formSubmission(e: FormEvent) {
    e.preventDefault();
    props.addTag(tag);

    addTagToBack({ variables: { args: { idFile: id, tag } } });

    // Reset Input after entry
    setTag('');
  }

  return (
    <div>
      <form onSubmit={formSubmission}>
        <label htmlFor={id}>
          Ajouter un tag :&nbsp;
          <br />
          <input
            type="text"
            id={id}
            name="tag"
            value={tag}
            className="rounded-full border-1 border-black-100 p-0.5"
            onChange={(e) => setTag(e.target.value)}
          />
        </label>
        <button className="bg-green-500 p-1 rounded-lg" type="submit">
          OK
        </button>
      </form>
    </div>
  );
}

export default AddTag;
