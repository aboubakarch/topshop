/* eslint-disable testing-library/prefer-screen-queries */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '.';
import Filters from '../../components/Filters';
import { categoryMock, productsMock } from '../../constants/mockDat';
import reducer, {
  filterProduct,
  searchProduct,
} from '../../store/productSlice';

import { renderWithProviders } from '../../utils/test-utils';

describe('Filteration tests', () => {
  test('all categories to be populated', () => {
    const categories = categoryMock;

    renderWithProviders(<Home />, {
      preloadedState: {
        categoryData: { categories, loading: false },
      },
    });

    const catElms = screen.getAllByTestId('category-filter');
    expect(catElms.length).toBe(5);
  });

  test('all products to be populated', () => {
    const productData = {
      products: productsMock,
      paginatedProducts: productsMock.slice(0, 9),
    };

    renderWithProviders(<Home />, {
      preloadedState: {
        productData,
      },
    });

    const prodElms = screen.getAllByTestId('prod-card');
    expect(prodElms.length).toBe(9);
  });

  test('category filter click working', async () => {
    const categoryData = { categories: categoryMock };

    const onFilter = jest.fn();

    const { getByText } = renderWithProviders(<Filters onFilter={onFilter} />, {
      preloadedState: {
        categoryData,
      },
    });
    const filterBtn = getByText('Shushi');
    await userEvent.click(filterBtn);
    expect(onFilter).toHaveBeenCalled();
  });

  test('filtrarion by category id', async () => {
    const categoryData = { categories: categoryMock };

    const productData = {
      products: productsMock,
      paginatedProducts: productsMock.slice(0, 9),
    };

    renderWithProviders(<Home />, {
      preloadedState: {
        productData,
        categoryData,
      },
    });

    const state = reducer(
      { products: productsMock },
      filterProduct(categoryMock[0].id)
    );
    expect(state.filterdProduct?.length).toBeGreaterThan(1);
  });

  test('search products by name', () => {
    const categoryData = { categories: categoryMock };

    const productData = {
      products: productsMock,
      paginatedProducts: productsMock.slice(0, 9),
    };

    renderWithProviders(<Home />, {
      preloadedState: {
        productData,
        categoryData,
      },
    });

    const state = reducer(
      { products: productsMock },
      searchProduct(productsMock[0].name)
    );
    expect(state.searchedProducts?.length).toBeGreaterThanOrEqual(1);
  });
});
