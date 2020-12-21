// import React from 'react';
// import ReactDOM from 'react-dom';
// import { act } from 'react-dom/test-utils';
// import { mount } from 'enzyme';

// import axios from 'axios';

// import App from './App';

// // let container;

// // beforeEach(() => {
// //   container = document.createElement('div');
// //   document.body.appendChild(container);
// // });

// // afterEach(() => {
// //   document.body.removeChild(container);
// //   container = null;
// // });

// // it('can render and notify the user of a loading state', () => {
// //   act(() => {
// //     ReactDOM.render(<App />, container);
// //   });

// //   const loadingStatus = container.querySelector('.loading');
// //   expect(loadingStatus.textContent).toBe('Loading...');
// // });

// it('can render and update item lists', () => {
//   jest
//     .spyOn(axios, 'get')
//     .mockImplementation(() => Promise.resolve(
//       {
//         data: [
//           {"id": 755, "listId": 2, "name": ""},
//           {"id": 684, "listId": 1, "name": "Item 684"},
//           {"id": 906, "listId": 2, "name": "Item 906"},
//           {"id": 735, "listId": 1, "name": "Item 735"},
//         ]
//     }));

//   // await act(async () => {
//   //   ReactDOM.render(<App />, container);
//   // });

//   // const header = container.querySelector('h1');
//   // expect(header.textContent).toBe('Items List');

//   // const lists = container.querySelector('.lists');
//   // console.log(lists.textContent);

//   const wrapper = mount(<App />);

//   // wrapper.update();
//   console.log(wrapper.instance())
// });


import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
jest.mock('axios', () => {
  return {
    __esModule: true,
    default: jest.fn()
  }
});

describe('MockComponentEnzyme', ()=>{
  it('should get data', (done) => {
    const axios = require('axios');
    jest.spyOn(axios, 'default').mockResolvedValue([
      {"id": 755, "listId": 2, "name": ""},
      {"id": 684, "listId": 1, "name": "Item 684"},
      {"id": 906, "listId": 2, "name": "Item 906"},
      {"id": 735, "listId": 1, "name": "Item 735"},
    ])
    const wrapper = shallow(<App/>, {
      disableLifecycleMethods: true
    });
    wrapper.instance().componentDidMount();
    process.nextTick(()=>{
      // expect(wrapper.state('error')).toBeFalsy();
      expect(wrapper.state().items).toEqual('abc');
      done();
    })
  })
})