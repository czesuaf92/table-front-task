import debaunce from 'lodash/debounce';
import { useEffect, useState } from "react";
import { useProducts } from '../contexts/ProductsContext';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { setFilterSearchTerm } = useProducts();

  useEffect(() => {
    const debouncedSearch = debaunce(() => {
      if (searchTerm.length >= 3) {
        setFilterSearchTerm(searchTerm);
      } else {
        setFilterSearchTerm('');
      }

    }, 300);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, setFilterSearchTerm]);

  return (
    <input
      type="text"
      placeholder="Search product..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      minLength={3}
    />
  );
};
export default SearchBar;
