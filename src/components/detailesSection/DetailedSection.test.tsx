import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, expect, test } from 'vitest';

import { SearchResp } from '../../model/TypesStarWars';
import { ApiService } from '../../services/ApiService';
import { testPeopleSearchArr } from '../main/TestData';

import DetailedSection from './DetailedSection.tsx';

let unmount = () => {};

afterEach(() => {
  unmount();
});

test('Check that a loading indicator is displayed while fetching data', () => {
  class MockApiService extends ApiService {
    getSeachedData(searchQuery: string): Promise<SearchResp> {
      const data = testPeopleSearchArr;

      console.log(searchQuery);

      return new Promise((resolve) => {
        resolve({ results: data });
      });
    }
  }

  const mockApiService = new MockApiService(fetch);

  const renderObject = render(
    <BrowserRouter>
      <DetailedSection service={mockApiService} />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  const spinner = screen.getByTestId('spinner_test');

  expect(spinner).toBeDefined();
});

test('Should close component after click on button', async () => {
  class MockApiService extends ApiService {
    getSeachedData(searchQuery: string): Promise<SearchResp> {
      const data = testPeopleSearchArr;

      console.log(searchQuery);

      return new Promise((resolve) => {
        resolve({ results: data });
      });
    }
  }

  const mockApiService = new MockApiService(fetch);

  const renderObject = render(
    <BrowserRouter>
      <DetailedSection service={mockApiService} />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  await waitFor(() => {
    expect(screen.getByText('X')).toBeDefined();
  });

  const button = screen.getByText('X');

  fireEvent.click(button);

  expect(renderObject.container.children.length).toEqual(0);
});

test('Should correctly display the detailed card data', async () => {
  class MockApiService extends ApiService {
    getSeachedData(searchQuery: string): Promise<SearchResp> {
      const data = testPeopleSearchArr;

      console.log(searchQuery);

      return new Promise((resolve) => {
        resolve({ results: data });
      });
    }
  }

  const mockApiService = new MockApiService(fetch);

  const renderObject = render(
    <BrowserRouter>
      <DetailedSection service={mockApiService} />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  await waitFor(() => {
    expect(screen.getByTestId('detailed_page')).toBeDefined();
  });

  const page = screen.getByTestId('detailed_page');

  expect(page.children).length(7);
});
