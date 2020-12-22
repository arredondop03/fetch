import React from 'react';
import axiosMock from 'axios';

import { cleanup, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import App from './App';

describe('<App />', () => {
  afterEach(() => cleanup());

  it('requests item data and renders the page', async () => {
    axiosMock.get.mockResolvedValue({ data: [] });
    const url = 'http://localhost:3001/items';
    const { getByText } = render(<App />);

    expect(getByText(/Loading.../i).textContent).toBe('Loading...');

    const resolvedHeader = await waitFor(() => getByText('Items List'));

    expect((resolvedHeader).textContent).toBe('Items List');

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(url);
  });

  it('rejects the axios request and reports an error', async () => {
    axiosMock.get.mockRejectedValue('Async error');

    const url = 'http://localhost:3001/items';

    const { getByText } = render(<App />);

    expect(getByText(/Loading.../i).textContent).toBe('Loading...');

    await act(async () => {
      expect(axiosMock.get).toHaveBeenCalledTimes(1);
      expect(axiosMock.get).toHaveBeenCalledWith(url);
      await expect(axiosMock.get).rejects.toEqual('Async error');
    });
  });
});
