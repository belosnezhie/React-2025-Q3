import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, expect, test } from 'vitest';

import { testPeopleSearchArr } from '../../components/main/TestData';
import { SearchResp } from '../../model/TypesStarWars';
import { ApiService } from '../../services/ApiService';

import MainPage from './MainPage.tsx';

let unmount = () => {};

afterEach(() => {
  unmount();
});

test('Check that a loading indicator is displayed while fetching default data', () => {
  class MockApiService extends ApiService {
    getDefaultData(): Promise<SearchResp> {
      const data = testPeopleSearchArr;

      return new Promise((resolve) => {
        resolve({ results: data });
      });
    }
  }

  const mockApiService = new MockApiService(fetch);

  const renderObject = render(
    <BrowserRouter>
      <MainPage service={mockApiService} />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  const spinner = screen.getByTestId('spinner_test');

  expect(spinner).toBeDefined();
});

test('Check that a loading indicator is displayed while fetching searched data', () => {
  class MockApiService extends ApiService {
    getSeachedData(query: string): Promise<SearchResp> {
      console.log(query);
      const data = testPeopleSearchArr;

      return new Promise((resolve) => {
        resolve({ results: data });
      });
    }
  }

  const mockApiService = new MockApiService(fetch);

  const renderObject = render(
    <BrowserRouter>
      <MainPage service={mockApiService} />
    </BrowserRouter>,
  );

  unmount = renderObject.unmount;

  const spinner = screen.getByTestId('spinner_test');

  expect(spinner).toBeDefined();
});
