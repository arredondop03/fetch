/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lists from './components/Lists/Lists';

import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultItems, setDefaultItems] = useState({});
  const [items, setItems] = useState({});
  const [listIdFilter, setListIdFilter] = useState(new Set());
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://fetch-hiring.s3.amazonaws.com/hiring.json')
      .then((response) => {
        // eslint-disable-next-line no-unreachable
        const filteredItems = response.data
          .filter((item) => item.name)
          .sort(itemComparator);

        const groupedItems = groupItems(filteredItems);

        setItems(groupedItems);
        setDefaultItems(groupedItems);
      })
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (listIdFilter.size > 0) {
      const filteredLists = {};
      listIdFilter.forEach((listId) => {
        filteredLists[listId] = defaultItems[listId];
      });
      setItems(filteredLists);
    }
  }, [listIdFilter, defaultItems]);

  let itemComparator = ((itemOne, itemTwo) => {
    const itemOneNumber = parseInt(itemOne.name.split(' ')[1], 10);
    const itemTwoNumber = parseInt(itemTwo.name.split(' ')[1], 10);

    return itemOneNumber - itemTwoNumber;
  });

  const searchName = (event) => {
    const filteredList = {};

    Object.keys(defaultItems).forEach((key) => {
      const searchQuery = event.target.value.toLowerCase();

      const tempItemsList = defaultItems[key]
        .map((item) => ({
          ...item,
          id: item.id.toString(),
          name: item.name.toLowerCase(),
        }))
        .filter(({ id, name }) => {
          const isNameIncluded = name.includes(searchQuery);
          const isIdIncluded = id.includes(searchQuery);
          return isNameIncluded || isIdIncluded;
        });

      if (tempItemsList.length > 0) {
        filteredList[key] = tempItemsList;
      }
    });

    setItems(filteredList);
  };

  const groupItems = (responseItems) => {
    const groupedItems = {};

    responseItems.forEach((item) => {
      groupedItems[item.listId]
        ? groupedItems[item.listId].push(item)
        : groupedItems[item.listId] = [item];
    });

    return groupedItems;
  };

  const changeListIdFilter = (newListId) => {
    const allListIds = new Set(listIdFilter);
    if (allListIds.has(newListId)) {
      allListIds.delete(newListId);
    } else {
      allListIds.add(newListId);
    }
    setListIdFilter(allListIds);
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
                  <input
                    type="text"
                    className="search-bar"
                    onChange={searchName}
                    placeholder="Search Items"
                  />

                  {Object.keys(defaultItems).map((listId) => (
                    <button
                      type="button"
                      key={listId}
                      onClick={() => changeListIdFilter(listId)}
                    >
                      {listId}
                    </button>
                  ))}
                  <Lists lists={items} />
                </div>
              )
          )
      }
    </div>
  );
};

export default App;
