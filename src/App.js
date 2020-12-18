import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchList();
    setIsLoading(false);
  }, []);

  let fetchList = () => {
    let dataObject = {};
    axios.get('./list.JSON')
      .then((response) => {
        populateObject(dataObject, response);
        sortLists(dataObject);
        setData(dataObject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let populateObject = (object, array) => {
    array.data.forEach((item) => {
      if(object[item.listId] && item.name) {
        object[item.listId].push(item);
      } else if(!object[item.listId] && item.name) {
        object[item.listId] = [item];
      }
    });
  };

  let sortLists = (dataObject) => {
    for (const listId in dataObject) {
      if (dataObject.hasOwnProperty(listId)) {
        dataObject[listId].sort((a, b) => {
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
      {Object.keys(data).map(function(key) {
        return <div key={key}>
          <h1>List {key}</h1>
      {data[key].map((item) => <p key={item.id}>{item.id} {item.listId} {item.name}</p>)}
        </div>
      })}
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