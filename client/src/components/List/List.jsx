import React from 'react';
import PropTypes from 'prop-types';

import './List.css';

const List = ({ list }) => (
  <div className="list-card-container">
    <h3 className="list-card-header">List Id {list[0].listId}</h3>
    <div className="list-table-container">
      <table className="list-table">
        <thead>
          <tr>
            <th className="list-item list-item-1">Item Id</th>
            <th className="list-item list-item-2">Id</th>
            <th className="list-item list-item-3">Name</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td className="list-item list-item-1">{item.listId}</td>
              <td className="list-item list-item-2">{item.id}</td>
              <td className="list-item list-item-3">{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default List;

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    listId: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};
