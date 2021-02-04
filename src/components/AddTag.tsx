import React, { FormEvent, useState } from 'react';
import CardFile from './CardFile';

function AddTag(props: any): JSX.Element {
  const [tag, setTag] = useState('');

  function formSubmission(e: FormEvent) {
    e.preventDefault();
    props.addTag(tag);
    // Reset Input after entry
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
