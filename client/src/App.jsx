/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lists from './components/Lists/Lists';

import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultItems, setDefaultItems] = useState({});
  const [items, setItems] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:3001/items')
      .then((response) => {
        // eslint-disable-next-line no-unreachable
        const responseItems = response.data
          .filter((item) => item.name)
          .sort(itemComparator);

        const groupedItems = groupItems(responseItems);

        setItems(groupedItems);
        setDefaultItems(groupedItems);
      })
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  let itemComparator = ((itemOne, itemTwo) => {
    const itemOneNumber = parseInt(itemOne.name.split(' ')[1], 10);
    const itemTwoNumber = parseInt(itemTwo.name.split(' ')[1], 10);

    return itemOneNumber - itemTwoNumber;
  });

  const searchName = (event) => {
    const filteredList = {};

    Object.keys(defaultItems).forEach((key) => {
      const tempItemsList = defaultItems[key]
        .filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
      if (tempItemsList.length > 0) {
        filteredList[key] = tempItemsList;
      }
    });

    setItems(filteredList);
  };

  let groupItems = (responseItems) => {
    const groupedItems = {};

    responseItems.forEach((item) => {
      groupedItems[item.listId]
        ? groupedItems[item.listId].push(item)
        : groupedItems[item.listId] = [item];
    });

    return groupedItems;
  };

  return (
    <div className="app">
      {
        isLoading
          ? <h3 className="message-for-user">Loading...</h3>
          : (
            errorMessage
              ? <h3 className="message-for-user">{errorMessage}</h3>
              : (
                <div className="lists-view">
                  <h1 className="header">Items List</h1>
                  <input className="search-bar" onChange={searchName} />
                  <Lists data-testid="lists" lists={items} />
                </div>
              )
          )
      }
    </div>
  );
};

export default App;
