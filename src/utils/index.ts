import { ProductState } from '../store/productSlice';

export const getPaginatedData = (state: ProductState) => {
  if (state.searchedProducts?.length) {
    const products = state.searchedProducts?.slice(0, 9 * (state.page || 1));
    return {
      products,
      hasMore: state.searchedProducts.length > products.length,
    };
  }

  if (state.filterdProduct?.length) {
    const products = state.filterdProduct.slice(0, 9 * (state.page || 1));
    return {
      products,
      hasMore: state.filterdProduct.length > products.length,
    };
  }

  const products = state.products.slice(0, 9 * (state.page || 1));
  return {
    products,
    hasMore: state.products.length > products.length,
  };
};

export const searchProducts = (state: ProductState, search: string) => {
  if (!search) return [];
  if (state.filterdProduct?.length) {
    return state.filterdProduct.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return state.products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
};
