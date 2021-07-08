import React from 'react';
import { cleanup, render } from '@testing-library/react';

import List from './List';

describe('<List />', () => {
  afterEach(() => cleanup());

  it('renders list components', () => {
    const items = [
        { id: 684, listId: 1, name: 'Item 684' }
    ];

    const { getByText } = render(<List list={items} />);

    const title = getByText(/List Id 1/i);
    const tableHeader1 = getByText(/Item Id/i);
    const tableHeader2 = getByText('Id');
    const tableHeader3 = getByText(/Name/i);
    const tableData1 = getByText(1);
    const tableData2 = getByText('684');
    const tableData3 = getByText('Item 684');
    expect(title.textContent).toBe('List Id 1');
    expect(tableHeader1.textContent).toBe('Item Id');
    expect(tableHeader2.textContent).toBe('Id');
    expect(tableHeader3.textContent).toBe('Name');
    expect(tableData1.textContent).toBe('1');
    expect(tableData2.textContent).toBe('684');
    expect(tableData3.textContent).toBe('Item 684');
  });
});
