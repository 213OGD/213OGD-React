/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import GET_FILES from './queries/files.queries';
import CardFile, { DatasProps } from './components/CardFile';
import './App.css';
import './index.css';
import SideBar from './components/SideBar';

function App(): JSX.Element {
  const { loading, error, data } = useQuery(GET_FILES);

  const [selectedTags, setSelectedTags] = useState<string[]>(['react']);

  const [displayTags, setDisplayTags] = useState<string[]>(['All']);

  function tagSelection(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === 'all') {
      if (e.target.checked) {
        setSelectedTags(['all']);
      } else {
        setSelectedTags([]);
      }
    }
    if (e.target.value !== 'all') {
      if (e.target.checked) {
        const removeTagAll = selectedTags.filter(
          (tagName) => tagName !== 'all'
        );
        setSelectedTags([...removeTagAll, e.target.value]);
      }
      if (!e.target.checked) {
        const removeTag = selectedTags.filter(
          (tagName) => tagName !== e.target.value
        );
        setSelectedTags(removeTag);
      }
    }
  }

  function isFileSelected(
    fileTags: string[],
    selectedTagsArray: string[]
  ): boolean {
    if (selectedTagsArray.includes('all')) return true;
    return fileTags.some((fileTag) =>
      selectedTagsArray.includes(fileTag.toLowerCase())
    );
  }

  const getTags = () => {
    const getAllFiles = data;
    if (!loading && getAllFiles.files) {
      getAllFiles.files.forEach(
        (file: JSX.IntrinsicAttributes & DatasProps) => {
          file.tags.forEach((tag) => {
            if (
              displayTags.findIndex(
                (copy) => copy.toLowerCase() === tag.toLowerCase()
              ) === -1
            ) {
              setDisplayTags([...displayTags, tag]);
            }
          });
        }
      );
    }
  };

  getTags(); // Get Tags and List them (front)

  return (
    <div className="container bg-cyan-500">
      <header className="w-full rounded-lg">
        <h1>213 Odyssey Google Drive</h1>
      </header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'stretch',
        }}
        className="container-cards rounded-xl p-8"
      >
        {loading && <h2>loading ...</h2>}
        {error && <h2>error</h2>}
        {displayTags && displayTags.length > 0 && (
          <div className="" style={{ width: '100vw' }}>
            <h3 className="">Tags</h3>
            {displayTags.map((tag) => (
              <div key={tag}>
                <input
                  type="checkbox"
                  name={tag.toLowerCase()}
                  value={tag.toLowerCase()}
                  id={tag}
                  onChange={tagSelection}
                  checked={
                    selectedTags.findIndex(
                      (tagName) => tagName.toLowerCase() === tag.toLowerCase()
                    ) !== -1
                  }
                />
                <label
                  htmlFor={tag}
                  style={{
                    margin: 4,
                    padding: 4,
                    backgroundColor: '#00f0ff',
                  }}
                >
                  {tag}
                </label>
              </div>
            ))}
          </div>
        )}
        {data &&
          data.files.map((file: JSX.IntrinsicAttributes & DatasProps) => {
            // eslint-disable-next-line react/jsx-props-no-spreading, no-underscore-dangle
            return isFileSelected(file.tags, selectedTags) === true ? (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <CardFile key={file._id} {...file} />
            ) : null;
          })}
      </div>
      <SideBar />
    </div>
  );
}

export default App;
