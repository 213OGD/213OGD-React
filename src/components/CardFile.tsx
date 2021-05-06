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
    <div className="w-72 rounded-2xl shadow-lg mt-5 p-2">
      <figure>
        <a href={webViewLink}>
          <img
            className="h-12"
            src={
              iconLink
                ? iconLink.replace('16', '256')
                : 'https://previews.123rf.com/images/kritchanut/kritchanut1405/kritchanut140500357/28235040-man-silhouette-icon-with-question-mark-sign-anonymous-suspect-concept.jpg'
            }
            alt={name}
          />
          <figcaption>{name}</figcaption>
        </a>
      </figure>
      <h3>Tags :</h3>
      {arrayList && arrayList.length > 0 && (
        <div className="flex flex-row">
          {arrayList.map((el) => (
            <p className="py-3 px-1" key={el}>
              {el}{' '}
              <button
                className="bg-gray-400 py-1 px-2rounded-md"
                type="submit"
                onClick={() => removeTagByIndex(el)}
              >
                X
              </button>
            </p>
          ))}
        </div>
      )}
      <AddTag {...data} id={_id} />
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
    </div>
  );
}

export default CardFile;
