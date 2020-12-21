import React from 'react';
import PropTypes from 'prop-types';

import List from '../List/List';
import './Lists.css';

const Lists = ({ lists }) => (
  <div className="lists-container">
    {Object.keys(lists).map((key) => <List key={key} list={lists[key]} />)}
  </div>
);

export default Lists;

Lists.propTypes = {
  lists: PropTypes.objectOf(PropTypes.array),
};

Lists.defaultProps = {
  lists: {},
};
