/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function AddTag(props: any): JSX.Element {
  const [tag, setTag] = useState('');

  const { id } = props;

  function formSubmission(e: FormEvent) {
    e.preventDefault();

    props.addTag(tag, id);

    // Reset Input after entry
    setTag('');
  }

  return (
    <div className="mb-4">
      <form onSubmit={formSubmission} className="flex flex-row flex-no-wrap">
        <input
          className="mr-2 text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-red-400 dark:focus:border-red-400 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
          type="text"
          id={id}
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Ajouter un tag"
        />
        <button
          className="bg-red-400 rounded-md p-2 text-white border-2 border-transparent hover:border-red-400 hover:bg-white hover:text-red-400 transition duration-500 ease select-none focus:outline-none focus:shadow-outline"
          type="submit"
        >
          OK
        </button>
      </form>
    </div>
  );
}

export default AddTag;
