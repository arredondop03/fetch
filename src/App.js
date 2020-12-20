import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lists from './components/Lists/Lists';

import './App.css';

const App = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [items, setItems] = useState({});
  let [name, setNames] = useState('');
  let [defaultItems, setDefaultItems] = useState('');
  let groupedItems = {};

  useEffect(() => {
    setIsLoading(true);

    axios.get('./list.JSON')
      .then((response) => {
        groupItems(response.data);
        sortLists();

        setItems(groupedItems);
        setDefaultItems(groupedItems);
        setIsLoading(false);
      })
      .catch((error) => console.log(error))
  }, []);

  let groupItems = (data) => {
    data.forEach((item) => {
      if (item.name) {
        if (groupedItems[item.listId]) {
          groupedItems[item.listId].push(item);
        } else {
          groupedItems[item.listId] = [item];
        }
      }
    });
  };

  let sortLists = () => {
    for (const listId in groupedItems) {
      groupedItems[listId].sort((itemOne, itemTwo) => {
        let itemOneNumber = parseInt(itemOne.name.split(' ')[1]);
        let itemTwoNumber = parseInt(itemTwo.name.split(' ')[1]);
        return itemOneNumber > itemTwoNumber ? 1 : -1;
      });
    }
  };

  let searchName = (event) => {
    setNames(event.target.value);
    let filteredList = {};

    for (const key in defaultItems) {
        filteredList[key] = defaultItems[key].filter((item) => item.name.includes(event.target.value));
    };
    setItems(filteredList);
  };

  return (
    <div className="app">
      {
        isLoading
          ? <h3 className="loading">Loading...</h3>
          :
          (
            <div>
              <h1 className="header">Items List</h1>
              <input 
                value={name}
                onChange={searchName}
              />
              <Lists lists={items} />
            </div>
          )
      }
    </div>
  );
};

export default App;

