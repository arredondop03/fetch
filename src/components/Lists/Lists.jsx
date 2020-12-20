import React from 'react';
import List from './../List/List';
import './Lists.css';

const Lists = ({lists}) => {

  return (
    <div className="lists-container">
     {Object.keys(lists).map(function(key) {
        return <List key={key} list={lists[key]}/>
      })}
    </div>
  );
};

export default Lists;