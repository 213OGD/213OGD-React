import React, { useState } from 'react';
import AddTag from './AddTag';

export type DatasProps = {
  _id: string;
  googleId?: string;
  name: string;
  webViewLink: string;
  iconLink: string;
  tags: string[];
  getTags: any;
};

function CardFile(props: DatasProps): JSX.Element {
  const { name, webViewLink, iconLink, tags } = props;

  const [array, setArray] = useState<string[]>(tags);
  const [warning, setWarning] = useState('');

  const data = {
    addTag: (res: string) => {
      if (array.find((item) => item.toLowerCase() == res.toLowerCase())) {
        setWarning('Ce tag existe déjà');
      } else {
        if (res.length >= 2) {
          setArray([...array, res]);
          setWarning('');
        } else {
          setWarning('Votre tag doit contenir 2 caractères minimum');
        }
      }
    },
  };

  let removeTagByIndex = (tag: string) => {
    let newArray = array.filter((item) => item !== tag);
    setArray(newArray);
  };

  return (
    <div style={{ width: 250 }} className="card">
      <figure>
        <a href={webViewLink}>
          <img
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
      {array && array.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'flex-start',
            flexWrap: 'wrap',
            height: 100,
            overflow: 'auto',
          }}
          className="tagContainer"
        >
          {array.map((el, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <p
              style={{
                fontSize: 12,
                borderWidth: 1,
                borderColor: 'black',
                borderStyle: 'solid',
                borderRadius: 4,
                backgroundColor: '#bffff1',
                margin: 2,
                padding: 2,
              }}
              key={index}
            >
              {el} <button onClick={() => removeTagByIndex(el)}>X</button>
            </p>
          ))}
        </div>
      )}
      <AddTag {...data} />
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
