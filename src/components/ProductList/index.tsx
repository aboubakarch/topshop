import * as React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useAppSelector } from '../../store';
import ListCard from './ListCard';
import './styles.css';

const ProductList: React.FC = () => {
  const { paginatedProducts, loading } = useAppSelector(
    (state) => state.productData
  );
  return (
    <div className="product-list">
      {loading &&
        [...new Array(9)].map((_, idx) => (
          <Skeleton key={idx} height={400} containerClassName="product-item" />
        ))}
      {paginatedProducts?.length ? (
        paginatedProducts?.map((item) => <ListCard data={item} key={item.id} />)
      ) : (
        <div className="no-record">
          <p>No Product Found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
