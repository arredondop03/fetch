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
        response.data.forEach((item) => {
          if(dataObject[item.listId] && item.name) {
            dataObject[item.listId].push(item);
          } else if(!dataObject[item.listId] && item.name) {
            dataObject[item.listId] = [item];
          }
        });
        for (const listId in dataObject) {
          if (dataObject.hasOwnProperty(listId)) {
            const element = dataObject[listId];
            sortList(element);
          }
        }
        setData(dataObject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let sortList = (list) => {
    list.sort((a, b) => {
      let aNumber = a.name.split(' ');
      let bNumber = b.name.split(' ');
      let aInt = parseInt(aNumber[1]);
      let bInt = parseInt(bNumber[1]);
      return (aInt > bInt) ? 1 : -1;
    });
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