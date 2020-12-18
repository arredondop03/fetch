import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lists from './components/Lists/Lists';
import './App.css';

const App = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [items, setItems] = useState([]);
  let groupedItems = {};

  useEffect(() => {
    setIsLoading(true);
    axios.get('./list.JSON')
      .then((response)=> {
        groupItems(response.data);
        sortLists();
        setItems(groupedItems);
        setIsLoading(false);
      })
      .catch((error)=> console.log(error))
  }, []);

  let groupItems = (array) => {
    array.forEach((item) => {
      if(groupedItems[item.listId] && item.name) {
        groupedItems[item.listId].push(item);
      } else if(!groupedItems[item.listId] && item.name) {
        groupedItems[item.listId] = [item];
      }
    });
  };

  let sortLists = () => {
    for (const listId in groupedItems) {
      if (groupedItems.hasOwnProperty(listId)) {
        groupedItems[listId].sort((a, b) => {
          let aNumber = a.name.split(' ');
          let bNumber = b.name.split(' ');
          let aInt = parseInt(aNumber[1]);
          let bInt = parseInt(bNumber[1]);
          return (aInt > bInt) ? 1 : -1;
        });
      }
    }
  };

  return (
    <div>
      <Lists lists={items}/>
    </div>
  );
};

export default App;

  {/* {
    isLoading ?
      <div>Loading...</div> :
    (
      <div></div>
    )
  } */}