import * as React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchCategories } from '../../store/categorySlice';
import './styles.css';

const Filters: React.FC<Filter> = ({ onFilter }) => {
  const [filter, setFilter] = React.useState<string>('all');
  const { categories, loading } = useAppSelector((state) => state.categoryData);
  const diapatch = useAppDispatch();

  const handleFilter = (id: string) => {
    setFilter(id);
    onFilter(id);
  };

  React.useEffect(() => {
    diapatch(fetchCategories());
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`filter-container${loading ? ' container-width' : ''}`}>
      {loading &&
        [...new Array(5)].map((_, idx) => (
          <Skeleton key={idx} height={50} containerClassName="w-19%" />
        ))}
      {!loading && (
        <div
          className={`filter-item ${
            filter === 'all' ? 'filter-item-active' : ''
          }`}
          onClick={() => handleFilter('all')}
        >
          <p>All</p>
        </div>
      )}{' '}
      {categories.map(({ id, name }) => (
        <div
          data-testid="category-filter"
          key={id}
          className={`filter-item ${filter === id ? 'filter-item-active' : ''}`}
          onClick={() => handleFilter(id)}
        >
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};

export default Filters;
