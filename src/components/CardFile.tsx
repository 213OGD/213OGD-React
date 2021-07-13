/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import AddTag from './AddTag';
import { DELETE_TAG, ADD_TAG } from '../queries/tags.queries';

export type DatasProps = {
  id: string;
  googleId?: string;
  name: string;
  webViewLink: string;
  iconLink: string;
  tags: string[];
  role: string;
  onReturnTags: (tags: string[]) => void;
};

function CardFile({
  name,
  webViewLink,
  iconLink,
  tags,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  id,
  role,
  onReturnTags,
}: DatasProps): JSX.Element {
  const [arrayList, setArrayList] = useState<string[]>(tags);
  const [warning, setWarning] = useState('');

  const [addTagToBack] = useMutation(ADD_TAG);

  const [deleteTagToBack] = useMutation(DELETE_TAG);

  const data = {
    addTag: async (tag: string, fileId: number) => {
      if (arrayList.find((item) => item.toLowerCase() === tag.toLowerCase())) {
        setWarning('Ce tag existe déjà');
      } else {
        // eslint-disable-next-line no-lonely-if
        if (tag.length >= 2) {
          const addTag = await addTagToBack({
            variables: { args: { idFile: fileId, tag } },
          });
          const tagList: string[] = [];
          setArrayList([...arrayList, tag]);

          addTag.data.addTag.tags.map((t: any) => {
            console.log(t.name);
            return tagList.push(t.name);
          });

          onReturnTags(tagList);
          setWarning('');
        } else {
          setWarning('Votre tag doit contenir 2 caractères minimum');
        }
      }
    },
  };

  const removeTagByIndex = async (tag: string) => {
    const newArray = arrayList.filter((item) => item !== tag);

    const removeTag = await deleteTagToBack({
      variables: { args: { idFile: id, tag } },
    });
    setArrayList(newArray);
    const tagList: string[] = [];

    removeTag.data.deleteTag.tags.map((t: any) => {
      return tagList.push(t.name);
    });

    onReturnTags(tagList);
  };

  const [show, setShow] = useState(false);

  return (
    <div className="w-full lg:w-60 border border-gray-200 rounded-2xl shadow-lg my-6 p-3">
      <figure className="min-h-72">
        <a href={webViewLink}>
          <img
            className="h-16 p-2"
            src={
              iconLink
                ? iconLink.replace('16', '256')
                : 'https://previews.123rf.com/images/kritchanut/kritchanut1405/kritchanut140500357/28235040-man-silhouette-icon-with-question-mark-sign-anonymous-suspect-concept.jpg'
            }
            alt={name}
          />
          <figcaption className="pl-2 py-3 text-gray-600 break-all">
            {name}
          </figcaption>
        </a>
      </figure>
      {role === 'teacher' && <AddTag {...data} id={id} />}
      {arrayList && arrayList.length > 0 && (
        <div className="relative">
          <div
            className="bg-white dark:bg-gray-800 flex items-center justify-between border rounded border-gray-300 dark:border-gray-700 w-40 cursor-pointer w-full"
            onClick={() => setShow(!show)}
          >
            <p className="pl-3 py-3 text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal font-normal">
              Tags utilis&eacute;s
            </p>
            <div className="cursor-pointer text-gray-600 dark:text-gray-400 mr-3">
              {show ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" icon icon-tabler icon-tabler-chevron-up"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-up"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="6 15 12 9 18 15" />
                </svg>
              )}
            </div>
          </div>
          {warning && (
            <p
              style={{
                backgroundColor: '#9c2a2a',
                color: 'white',
                textShadow: 'black',
                fontWeight: 'bold',
              }}
            >
              {warning}
            </p>
          )}
          {show && (
            <ul className="visible transition duration-300 opacity-100 bg-white dark:bg-gray-800 shadow rounded mt-2 w-full py-1 absolute">
              {arrayList.map((el) => (
                <li
                  className="cursor-pointer text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                  key={el}
                >
                  {el}{' '}
                  {role === 'teacher' && (
                    <button
                      className="bg-red-400 ml-1 p-1 rounded-full text-white hover:bg-white hover:text-red-400"
                      type="submit"
                      onClick={() => removeTagByIndex(el)}
                    >
                      X
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default CardFile;
