import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect, test } from 'vitest';

import { SearchResp } from '../../model/TypesStarWars';
import { ApiService } from '../../services/ApiService';
import { testPeopleSearchArr } from '../main/TestData';

import DetailedSection from './DetailedSection.tsx';

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

  const mockApiService = new MockApiService();

  render(
    <BrowserRouter>
      <DetailedSection service={mockApiService} />
    </BrowserRouter>,
  );

  const spinner = screen.getByTestId('spinner_test');

  expect(spinner).toBeDefined();
});
