import React from 'react';
import WujieReact from 'wujie-react';
export default function WujieComponent(props) {
  return (
    <WujieReact
      width="100%"
      height="100%"
      name={props.name}
      url={props.url}
      sync={true}
      fetch={fetch}
      alive={true}
    ></WujieReact>
  );
}
