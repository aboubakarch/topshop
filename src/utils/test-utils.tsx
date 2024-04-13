import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import type { RootState } from '../store';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categorySlice from '../store/categorySlice';
import productSlice from '../store/productSlice';
import { categoryMock, productsMock } from '../constants/mockDat';

const setupStoreMock = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: combineReducers({
      categoryData: categorySlice,
      productData: productSlice,
    }),
    preloadedState,
  });
};

type AppStore = ReturnType<typeof setupStoreMock>;

export const mockStore = setupStoreMock();

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      categoryData: {
        categories: categoryMock,
      },
      productData: {
        products: productsMock,
        hasMore: true,
      },
    },
    // Automatically create a store instance if no store was passed in
    store = setupStoreMock(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
