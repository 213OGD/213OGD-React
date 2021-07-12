/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTagSelection = (
  dataTags: any,
  loadingTags: boolean,
  updateTagList: string[]
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
    function getTags() {
      const tagList: string[] = ['All'];

      if (!loadingTags) {
        // eslint-disable-next-line array-callback-return
        dataTags.tags.map((tag: { name: string }) => {
          tagList.push(tag.name);
        });
        setDisplayTags(tagList);
      }
      if (tagList !== updateTagList && updateTagList.length > 0) {
        updateTagList.unshift('All');
        setDisplayTags(updateTagList);
      }
    }
    getTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTags, loadingTags, updateTagList]);

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
