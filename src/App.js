import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lists from './components/Lists/Lists';

import './App.css';

const App = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [defaultItems, setDefaultItems] = useState({});
  let [items, setItems] = useState({});

  useEffect(() => {
    setIsLoading(true);

    axios.get('./list.JSON')
      .then((response) => {
        const responseItems = response.data
          .filter((item) => item.name)
          .sort(itemComparator);

        const groupedItems = groupItems(responseItems);

        setItems(groupedItems);
        setDefaultItems(groupedItems);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  let itemComparator = ((itemOne, itemTwo) => {
    const itemOneNumber = parseInt(itemOne.name.split(' ')[1]);
    const itemTwoNumber = parseInt(itemTwo.name.split(' ')[1]);

    return itemOneNumber - itemTwoNumber;
  });

  let groupItems = (responseItems) => {
    const groupedItems = {};

    responseItems.forEach((item) => 
      groupedItems[item.listId]
        ? groupedItems[item.listId].push(item)
        : groupedItems[item.listId] = [item]
    );

    return groupedItems;
  }


  let searchName = (event) => {
    const filteredList = {};

    for (const key in defaultItems) {
      const tempItemsList = defaultItems[key]
        .filter((item) => item.name.includes(event.target.value));
        
      if (tempItemsList.length > 0) {
        filteredList[key] = tempItemsList;
      };
    }

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
              <input onChange={searchName} />
              <Lists lists={items} />
            </div>
          )
      }
    </div>
  );
};

export default App;

