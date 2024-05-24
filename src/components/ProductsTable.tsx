import { useCallback, useEffect, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList } from "react-window";
import { useProducts } from "../contexts/ProductsContext";
import Category from "./Category";
import FilterSelect from "./FilterSelect";
import SearchBar from "./SearchBar";

const ProductsTable: React.FC = () => {
  const { products, setFilterCategory, categorySelectOptions, subcategorySelectOptions, setFilterSubcategory } = useProducts();
  const listRef = useRef<VariableSizeList>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [products]);

  const getCategoryHeight = useCallback((index: number) => {
    let totalHeight = 80;

    products[index].subcategories.forEach(subcategory => {
      totalHeight += 60;

      subcategory.products.forEach(() => {
        totalHeight += 40;
      });
    });

    return totalHeight;
  }, [products]);

  return (
    <div className="table-wrapper">
      <div className="searchbar-wrapper">
        <SearchBar />
        <FilterSelect
          options={categorySelectOptions}
          placeholder="Select category"
          name="categories"
          onChangeCallback={setFilterCategory}
        />
        <FilterSelect
          options={subcategorySelectOptions}
          placeholder="Select subcategory"
          name="subcategories"
          onChangeCallback={setFilterSubcategory}
        />
      </div>
      <div className="products-table">
        <AutoSizer>
          {({ height, width }: { height: number; width: number; }) => {
            return (
              <VariableSizeList
                ref={listRef}
                height={height}
                width={width}
                itemSize={getCategoryHeight}
                itemCount={products.length}
              >
                {({ index, style }) => (
                  <div style={style}>
                    <Category key={products[index].catId} category={products[index]} />
                  </div>
                )}
              </VariableSizeList>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};

export default ProductsTable;
