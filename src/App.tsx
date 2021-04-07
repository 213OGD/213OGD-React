import { useState } from 'react';
import { useQuery } from '@apollo/client';
import GET_FILES from './queries/files.queries';
import CardFile, { DatasProps } from './components/CardFile';
import './App.css';
import SideBar from './components/SideBar';

function App(): JSX.Element {
  const { loading, error, data } = useQuery(GET_FILES);

  const [selectedTags, setSelectedTags] = useState<string[]>(['react']);
  //useState<DatasProps[]>([]);
  const tags = [{ id: 1, name: 'All' }];

  function tagSelection(e: any) {
    if (e.target.value == 'all') {
      if (e.target.checked) {
        setSelectedTags(['all']);
      } else {
        setSelectedTags([]);
      }
    }
    if (e.target.value != 'all') {
      if (e.target.checked) {
        const removeTagAll = selectedTags.filter((tagName) => tagName != 'all');
        setSelectedTags([...removeTagAll, e.target.value]);
      }
      if (!e.target.checked) {
        const removeTag = selectedTags.filter(
          (tagName) => tagName != e.target.value
        );
        console.log('removeTag', removeTag);
        setSelectedTags(removeTag);
      }
      console.log(selectedTags);
    }
  }

  function isFileSelected(fileTags: string[], selectedTags: string[]): Boolean {
    if (selectedTags.includes('all')) return true;
    return fileTags.some((fileTag) =>
      selectedTags.includes(fileTag.toLowerCase())
    );
  }

  data &&
    data.files.map((file: JSX.IntrinsicAttributes & DatasProps) => {
      file.tags.forEach((tag) => {
        if (
          tags.findIndex(
            (copy) => copy.name.toLowerCase() == tag.toLowerCase()
          ) == -1
        ) {
          tags.push({ id: Math.random() * 1000, name: tag });
        }
      });
    });

  return (
    <div className="container">
      <header>
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
        className="container-cards"
      >
        {loading && <h2>loading ...</h2>}
        {error && <h2>error</h2>}
        {tags && tags.length > 0 && (
          <div style={{ width: '100vw', backgroundColor: 'yellow' }}>
            <h3>Tags</h3>
            {tags.map((tag) => (
              <div key={tag.id}>
                <input
                  type="checkbox"
                  name={tag.name.toLowerCase()}
                  value={tag.name.toLowerCase()}
                  id={tag.id.toString()}
                  onChange={tagSelection}
                  checked={
                    selectedTags.findIndex(
                      (tagName) =>
                        tagName.toLowerCase() == tag.name.toLowerCase()
                    ) != -1
                      ? true
                      : false
                  }
                ></input>
                <label
                  htmlFor={tag.id.toString()}
                  style={{
                    margin: 4,
                    padding: 4,
                    backgroundColor: '#00f0ff',
                  }}
                >
                  {tag.name}
                </label>
              </div>
            ))}
          </div>
        )}

        {data &&
          data.files.map((file: JSX.IntrinsicAttributes & DatasProps) => {
            // eslint-disable-next-line react/jsx-props-no-spreading, no-underscore-dangle
            if (isFileSelected(file.tags, selectedTags) == true) {
              return <CardFile key={file._id} {...file} />;
            }
          })}
      </div>
      <SideBar />
    </div>
  );
}

export default App;
