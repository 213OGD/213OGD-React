/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useQuery } from '@apollo/client';
import GET_FILES from './queries/files.queries';
import CardFile, { DatasProps } from './components/CardFile';
import SideBar from './components/SideBar';
import useTagSelection from './hooks/useTagSelection';

function App(): JSX.Element {
  const { loading, error, data } = useQuery(GET_FILES);

  const [
    displayTags,
    selectedTags,
    tagSelection,
    isFileSelected,
  ] = useTagSelection(data, loading);

  return (
    <div className="sm:container sm:mx-auto bg-green-400">
      <header className="bg-no-repeat bg-wild bg-center flex justify-center p-20">
        <h1 className="text-gray-200 text-2xl">213 Odyssey Google Drive</h1>
      </header>

      <div className="sm:flex sm:flex-row">
        <SideBar />
        <div className="container p-4 bg-blue-400">
          {loading && <h2>loading ...</h2>}
          {error && <h2>error</h2>}
          {displayTags && displayTags.length > 0 && (
            <div className="bg-red-300 flex flex-row flex-wrap">
              <h3 className="">Tags</h3>
              {displayTags.map((tag: string) => (
                <div className="p-2" key={tag}>
                  <input
                    type="checkbox"
                    name={tag.toLowerCase()}
                    value={tag.toLowerCase()}
                    id={tag}
                    onChange={(e) => tagSelection(e)}
                    checked={
                      selectedTags.findIndex(
                        (tagName: string) =>
                          tagName.toLowerCase() === tag.toLowerCase()
                      ) !== -1
                    }
                  />
                  <label
                    htmlFor={tag}
                    style={{
                      margin: 4,
                      padding: 4,
                    }}
                  >
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-start justify-start flex-row p-2 bg-blue-200 h-96 overflow-auto">
            {data &&
              data.files.map((file: JSX.IntrinsicAttributes & DatasProps) => {
                // eslint-disable-next-line react/jsx-props-no-spreading, no-underscore-dangle
                return isFileSelected(file.tags, selectedTags) === true ? (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <CardFile key={file._id} {...file} />
                ) : null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
