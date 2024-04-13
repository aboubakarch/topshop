import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface CategoryState {
  loading?: boolean;
  isFailed?: boolean;
  categories: Category[];
}

const initialState: CategoryState = {
  loading: false,
  isFailed: false,
  categories: [],
};

export const fetchCategories = createAsyncThunk('category', async () => {
  const response = await axios.get(
    'https://run.mocky.io/v3/b88ec762-2cb3-4015-8960-2839b06a7593'
  );
  return response.data;
});

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.loading = false;
      state.isFailed = true;
    });
  },
});

export default categorySlice.reducer;
