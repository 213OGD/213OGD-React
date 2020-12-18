import React, { FormEvent, useState } from 'react';

function AddTag(): JSX.Element {
  const [tag, setTag] = useState('');

  function formSubmission(e: FormEvent) {
    e.preventDefault();
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
