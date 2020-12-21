import React from 'react';
import axios from 'axios';
import Lists from './components/Lists/Lists';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      defaultItems: {},
      items: {},
    };
  }

  componentDidMount() {
    this.setState({isLoading: true})
    axios.get('http://localhost:3001/items')
      .then((response) => {
        const responseItems = response.data
          .filter((item) => item.name)
          .sort(this.itemComparator);

        const groupedItems = this.groupItems(responseItems);

        this.setState({items: groupedItems})
        this.setState({defaultItems: groupedItems})
      })
      .catch((error) => console.log(error))
      .finally(() => this.setState({isLoading: false}));
  }

  itemComparator(itemOne, itemTwo) {
    const itemOneNumber = parseInt(itemOne.name.split(' ')[1]);
    const itemTwoNumber = parseInt(itemTwo.name.split(' ')[1]);

    return itemOneNumber - itemTwoNumber;
  };

  groupItems(responseItems) {
    const groupedItems = {};

    responseItems.forEach((item) => 
      groupedItems[item.listId]
        ? groupedItems[item.listId].push(item)
        : groupedItems[item.listId] = [item]
    );

    return groupedItems;
  }


  searchName(event) {
    const filteredList = {};

    for (const key in this.state.defaultItems) {
      const tempItemsList = this.state.defaultItems[key]
        .filter((item) => item.name.includes(event.target.value));
        
      if (tempItemsList.length > 0) {
        filteredList[key] = tempItemsList;
      };
    }

    this.setState({items: filteredList});
  };

  render() {
    return (
      <div className="app">
      {
        this.state.isLoading
          ? <h3 className="loading">Loading...</h3>
          :
          (
            <div>
              <h1 className="header">Items List</h1>
              <input className="search-bar" onChange={this.searchName.bind(this)} />
              <Lists data-testid="lists" lists={this.state.items} />
            </div>
          )
      }
    </div>
    );
  }
}

export default App;

