import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, expect, test, vi } from 'vitest';

import useLocalStorage from '../../hooks/UseLocalStorage';

import SearchForm from './SearchForm.tsx';

const asyncMock = vi.fn().mockResolvedValue('default');
let unmount = () => {};

afterEach(() => {
  unmount();
});

test('should save the input value to the local storage after clicking search button', () => {
  const renderObject = render(
    <BrowserRouter>
      <SearchForm updateCartsCallback={asyncMock} />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  const textInput = screen.getByTestId('search_input');
  const form = screen.getByTestId('search_form');

  fireEvent.change(textInput, { target: { value: '1234' } });
  fireEvent.submit(form);

  expect(asyncMock.mock.calls).lengthOf(1);
  expect(asyncMock.mock.calls[0]).toEqual(['1234']);
});

test('should retrieve the value from the local storage upon mounting', () => {
  const { setItemToLS } = useLocalStorage();

  setItemToLS('1234');

  const renderObject = render(
    <BrowserRouter>
      <SearchForm updateCartsCallback={asyncMock} />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  const textInput = screen.getByTestId('search_input');

  expect(textInput.getAttribute('value')).toEqual('1234');
});
