import React from 'react';
import './List.css';
const List = ({list}) => {
  return (
    <div className="list-card-container">
      <h3 className="list-card-header">List Id {list[0].listId}</h3>
      <div className="list-table-container">
        <table className="list-table">
          <tr>
            <th className="list-item list-item-1">Item Id</th>
            <th className="list-item list-item-2">Id</th>
            <th className="list-item list-item-3">Name</th>
          </tr>
        {list.map((item) => (
          <tr key={item.id}>
            <td className="list-item list-item-1">{item.listId}</td>
            <td className="list-item list-item-2">{item.id}</td>
            <td className="list-item list-item-3">{item.name}</td>
          </tr>
        ))}
          </table>
      </div>
    </div>
  );
};

export default List;