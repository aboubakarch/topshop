import * as React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './styles.css';

const Search: React.FC<Search> = ({ onSearch }) => {
  return (
    <div data-testid="search-input" className="search-container">
      <AiOutlineSearch size={20} className="search-icon" />
      <input
        data-testid="search"
        type="text"
        placeholder="Enter resturant name here..."
        onChange={({ target: { value } }) => onSearch(value)}
      />
    </div>
  );
};

export default Search;
