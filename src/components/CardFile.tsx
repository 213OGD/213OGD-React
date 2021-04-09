/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import AddTag from './AddTag';
import DELETE_TAG from '../queries/deleteTag.queries';

export type DatasProps = {
  _id: string;
  googleId?: string;
  name: string;
  webViewLink: string;
  iconLink: string;
  tags: string[];
};

function CardFile(props: DatasProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name, webViewLink, iconLink, tags, _id } = props;

  const [arrayList, setArrayList] = useState<string[]>(tags);
  const [warning, setWarning] = useState('');

  const [
    deleteTagToBack,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(DELETE_TAG);

  const data = {
    addTag: (res: string) => {
      if (arrayList.find((item) => item.toLowerCase() === res.toLowerCase())) {
        setWarning('Ce tag existe déjà');
      } else {
        // eslint-disable-next-line no-lonely-if
        if (res.length >= 2) {
          setArrayList([...arrayList, res]);
          setWarning('');
        } else {
          setWarning('Votre tag doit contenir 2 caractères minimum');
        }
      }
    },
  };

  const removeTagByIndex = (tag: string) => {
    const newArray = arrayList.filter((item) => item !== tag);

    deleteTagToBack({ variables: { args: { idFile: _id, tag } } });

    setArrayList(newArray);
  };

  return (
    <div className="p-4 m-2 border-2 border-black border-opacity-30">
      <figure>
        <a href={webViewLink}>
          <img
            className="w-12 h-12"
            src={
              iconLink
                ? iconLink.replace('16', '256')
                : 'https://previews.123rf.com/images/kritchanut/kritchanut1405/kritchanut140500357/28235040-man-silhouette-icon-with-question-mark-sign-anonymous-suspect-concept.jpg'
            }
            alt={name}
          />
          <figcaption className="text-center">{name}</figcaption>
        </a>
      </figure>
      <h3>Tags :</h3>
      {arrayList && arrayList.length > 0 && (
        <div className="tagContainer flex flex-row justify-center content-start flex-wrap h-10 overflow-auto">
          {arrayList.map((el) => (
            <p
              className="rounded border border-black m-0.5 p-0.5 bg-green-100"
              key={el}
            >
              {el}{' '}
              <button type="submit" onClick={() => removeTagByIndex(el)}>
                X
              </button>
            </p>
          ))}
        </div>
      )}
      <AddTag {...data} id={_id} />
      {warning && (
        <p className="bg-red-800 text-white font-bold rounded">{warning}</p>
      )}
    </div>
  );
}

export default CardFile;
