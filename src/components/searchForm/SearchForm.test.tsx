import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';

import SearchForm from './SearchForm.tsx';

const asyncMock = vi.fn().mockResolvedValue('default');

test('should save the input value to the local storage after clicking search button', () => {
  render(
    <BrowserRouter>
      <SearchForm updateCartsCallback={asyncMock} />
    </BrowserRouter>,
  );

  const textInput = screen.getByTestId('search_input');
  const form = screen.getByTestId('search_form');

  fireEvent.change(textInput, { target: { value: '1234' } });
  fireEvent.submit(form);

  expect(asyncMock.mock.calls).lengthOf(1);
  expect(asyncMock.mock.calls[0]).toEqual(['1234']);
});
