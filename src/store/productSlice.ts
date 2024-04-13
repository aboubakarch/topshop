import { getPaginatedData, searchProducts } from './../utils/index';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ProductState {
  loading?: boolean;
  isFailed?: boolean;
  products: Product[];
  paginatedProducts?: Product[];
  searchedProducts?: Product[];
  filterdProduct?: Product[];
  page?: number;
  hasMore?: boolean;
}

const initialState: ProductState = {
  loading: false,
  isFailed: false,
  products: [],
  paginatedProducts: [],
  searchedProducts: [],
  filterdProduct: [],
  page: 1,
  hasMore: true,
};

export const fetchProducts = createAsyncThunk('product', async () => {
  const response = await axios.get(
    'https://run.mocky.io/v3/c75dc0d8-ad78-4b3d-b697-807a5ded8645'
  );
  return response.data.foods;
});

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProduct: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const filterd = state.products.filter(
        (item) => item.categoryId === payload
      );
      state.filterdProduct = filterd;
      state.page = 1;
      const { hasMore, products } = getPaginatedData(state);
      state.paginatedProducts = products;
      state.hasMore = hasMore;
    },
    searchProduct: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      let searched = searchProducts(state, payload);
      state.searchedProducts = searched;
      state.page = 1;
      if (payload && !searched.length) {
        state.paginatedProducts = [];
        state.hasMore = false;
        return;
      }
      const { hasMore, products } = getPaginatedData(state);
      state.paginatedProducts = products;
      state.hasMore = hasMore;
    },

    loadMore: (state) => {
      state.page = (state.page || 1) + 1;
      const { hasMore, products } = getPaginatedData(state);
      state.paginatedProducts = products;
      state.hasMore = hasMore;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.paginatedProducts = action.payload.slice(0, 9);
      state.hasMore = action.payload.length > 9;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
      state.isFailed = true;
    });
  },
});

export const { searchProduct, filterProduct, loadMore } = productSlice.actions;

export default productSlice.reducer;
