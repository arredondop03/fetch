import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Lists from './Lists';

describe('<Lists />', () => {
  afterEach(() => cleanup());

  it('renders list components', () => {
    const items = {
      1: [
        { id: 684, listId: 1, name: 'Item 684' },
        { id: 276, listId: 1, name: 'Item 276' },
      ],
      4: [
        { id: 808, listId: 4, name: 'Item 808' },
      ],
    };

    const { getByText, queryByText } = render(<Lists lists={items} />);

    expect(getByText('List Id 1').textContent).toEqual('List Id 1');
    expect(getByText('List Id 4').textContent).toEqual('List Id 4');
    expect(queryByText('List Id 2')).toBeNull();
  });
});
