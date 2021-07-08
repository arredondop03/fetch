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

    const { getAllByText } = render(<Lists lists={items} />);

    const elements = getAllByText(/List Id/i);
    expect(elements.length).toBe(2);
  });
});
