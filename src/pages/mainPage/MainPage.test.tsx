import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';

import { testPeopleSearchArr } from '../../components/main/TestData';
import { SearchResp } from '../../model/TypesStarWars';
import { ApiService } from '../../services/ApiService';

import MainPage from './MainPage.tsx';

test('Check that a loading indicator is displayed while fetching data', () => {
  class MockApiService extends ApiService {
    getDefaultData(): Promise<SearchResp> {
      const data = testPeopleSearchArr;

      return new Promise((resolve) => {
        resolve({ results: data });
      });
    }
  }

  const mockApiService = new MockApiService(fetch);

  render(
    <BrowserRouter>
      <MainPage service={mockApiService} />
    </BrowserRouter>,
  );

  const spinner = screen.getByTestId('spinner_test');

  expect(spinner).toBeDefined();
});
