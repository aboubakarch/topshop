import * as React from 'react';
import Filters from '../../components/Filters';
import Search from '../../components/Search';
import ProductList from '../../components/ProductList';
import { useAppDispatch, useAppSelector } from '../../store';
import './styles.css';
import {
  fetchProducts,
  filterProduct,
  loadMore,
  searchProduct,
} from '../../store/productSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { hasMore } = useAppSelector((state) => state.productData);

  const handleSearch = (search: string) => {
    dispatch(searchProduct(search));
  };

  const handleFilter = (category: string) => {
    dispatch(filterProduct(category));
  };

  const handleShowMore = () => {
    dispatch(loadMore());
  };

  React.useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <Search onSearch={handleSearch} />
      <Filters onFilter={handleFilter} />
      <ProductList />
      {hasMore && (
        <div className="row">
          <button onClick={handleShowMore}>+ Show More</button>
        </div>
      )}
    </div>
  );
};

export default Home;
