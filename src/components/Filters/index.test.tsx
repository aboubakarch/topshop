import { screen } from '@testing-library/react';
import { categoryMock } from '../../constants/mockDat';
import { renderWithProviders } from '../../utils/test-utils';
import Filters from '../Filters';

describe('filters component', () => {
  test('renders the component', async () => {
    renderWithProviders(<Filters onFilter={() => {}} />, {
      preloadedState: {
        categoryData: { categories: categoryMock, loading: false },
      },
    });

    expect(screen.getAllByTestId('category-filter').length).toBe(5);
  });
});
