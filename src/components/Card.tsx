import React from 'react';

export type DatasProps = {
  id: string;
  name: string;
  webViewLink: string;
  iconLink: string;
  tags: string[];
};

function Card(props: DatasProps): JSX.Element {
  const { name, webViewLink, iconLink, tags } = props;

  return (
    <div>
      <a href={webViewLink}>
        <figure>
          <img src={iconLink} alt={name} />
          <figcaption>{name}</figcaption>
        </figure>
      </a>
      <ul>
        {tags.map((el, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{el}</li>
        ))}
      </ul>
    </div>
  );
}

export default Card;
