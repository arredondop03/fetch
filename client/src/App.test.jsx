import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import axios from 'axios';

import App from './App';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and notify the user of a loading state', () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const loadingStatus = container.querySelector('Lists');
  expect(loadingStatus.textContent).toBe('Loading...');
});

it('can render and update item lists', async () => {
  jest
    .spyOn(axios, 'get')
    .mockImplementation(() => Promise.resolve(
      {
        data: [
          {"id": 755, "listId": 2, "name": ""},
          {"id": 684, "listId": 1, "name": "Item 684"},
          {"id": 906, "listId": 2, "name": "Item 906"},
          {"id": 735, "listId": 1, "name": "Item 735"},
        ]
    }));

  await act(async () => {
    ReactDOM.render(<App />, container);
  });

  const header = container.querySelector('h1');
  expect(header.textContent).toBe('Items List');

  const lists = container.querySelector('Lists');
  console.log(lists);
});