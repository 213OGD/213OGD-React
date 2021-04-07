import { FormEvent, useState } from 'react';
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

    addTagToBack({ variables: { args: { idFile: id, tag: tag } } });

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
            onChange={(e) => setTag(e.target.value)}
          />
        </label>
        <button type="submit">OK</button>
      </form>
    </div>
  );
}

export default AddTag;
