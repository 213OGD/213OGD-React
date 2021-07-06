/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { DatasProps } from '../components/CardFile';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTagSelection = (
  data: any,
  loading: boolean,
  dataTags: any,
  loadingTags: boolean
): any => {
  const [selectedTags, setSelectedTags] = useState<string[]>(['all']);
  const [displayTags, setDisplayTags] = useState<string[]>(['All']);

  // Selecting tags in Front
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
  useEffect(() => {
    // Get tags from Mongo
    const getTags = () => {
      const getAllTags = dataTags;
      if (!loadingTags && getAllTags) {
        console.log('tags', getAllTags);

        // getAllFiles.files.forEach(
        //   (file: JSX.IntrinsicAttributes & DatasProps) => {
        //     file.tags.forEach((tag: string) => {
        //       if (
        //         displayTags.findIndex(
        //           (copy) => copy.toLowerCase() === tag.toLowerCase()
        //         ) === -1
        //       ) {
        //         setDisplayTags([...displayTags, tag]);
        //       }
        //     });
        //   }
        // );
      }
    };
    // getTags(); // Get Tags and List them (front)
  }, [dataTags, loadingTags]);
  // Return True if file has tag checked
  function isFileSelected(
    fileTags: string[],
    selectedTagsArray: string[]
  ): boolean {
    if (selectedTagsArray.includes('all')) return true;
    return fileTags.some((fileTag) =>
      selectedTagsArray.includes(fileTag.toLowerCase())
    );
  }

  return [displayTags, selectedTags, tagSelection, isFileSelected];
};

export default useTagSelection;
