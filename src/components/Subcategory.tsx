import { useMemo, useState } from "react";
import { SortOptionType, SubCategoryType } from "../types";
import ProductRow from "./ProductRow";

interface SubcategoryProps {
  subcategory: SubCategoryType;
}

const SORT_OPTIONS: SortOptionType[] = ['-', 'asc', 'desc'];

const Subcategory = ({ subcategory }: SubcategoryProps) => {
  const [sortOption, setSortOption] = useState<SortOptionType>(SORT_OPTIONS[0]);

  const sortedProducts = useMemo(() => {
    if (sortOption === '-') {
      return subcategory.products;
    };

    return [...subcategory.products].sort((a, b) => {
      if (sortOption === 'asc') {
        return a.price - b.price;
      } else if (sortOption === 'desc') {
        return b.price - a.price;
      }

      return 0;
    });
  }, [sortOption, subcategory.products]);

  const handleSortClick = () => {
    const currentIndex = SORT_OPTIONS.indexOf(sortOption);
    const nextIndex = (currentIndex + 1) % SORT_OPTIONS.length;
    setSortOption(SORT_OPTIONS[nextIndex]);
  };

  return (
    <div className="subcategory">
      <div className="subcategory-header">
        <span>
          {subcategory.name}
        </span>
        <button onClick={handleSortClick}>{`Sort by: ${sortOption}`}</button>
      </div>
      {sortedProducts.map(product => (
        <ProductRow key={product.index} product={product} />
      ))}
    </div>
  );
};
export default Subcategory;
