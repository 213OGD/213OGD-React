import React from 'react';
import AddTag from './AddTag';

export type DatasProps = {
  _id: string;
  name: string;
  webViewLink: string;
  iconLink: string;
  tags: string[];
};

function CardFile(props: DatasProps): JSX.Element {
  const { name, webViewLink, iconLink, tags } = props;

  return (
    <div className="card">
      <figure>
        <a href={webViewLink}>
          <img src={iconLink} alt={name} />
          <figcaption>{name}</figcaption>
        </a>
      </figure>
      <h3>Tags :</h3>
      <ul>
        {tags.map((el, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{el}</li>
        ))}
      </ul>
      <AddTag />
    </div>
  );
}

export default CardFile;
