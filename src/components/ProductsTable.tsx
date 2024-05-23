import uniqBy from "lodash/uniqBy";
import { useMemo } from "react";
import { useProducts } from "../contexts/ProductsContext";
import Category from "./Category";
import FilterSelect from "./FilterSelect";
import SearchBar from "./SearchBar";

const ProductsTable: React.FC = () => {
  const { products } = useProducts();

  const categorySelectOptions = useMemo(() => (
    products.map(category => ({
      value: category.catId.toString(),
      label: category.name
    }))
  ), [products]);

  const subcategorySelectOptions = useMemo(() => (
    uniqBy(products.flatMap(category => category.subcategories).map(subcategory => ({
      value: subcategory.subCatId,
      label: subcategory.name
    })), 'label')
  ), [products]);

  return (
    <div>
      <div className="searchbar-wrapper">
        <SearchBar />
        <FilterSelect
          options={categorySelectOptions}
          placeholder="Select category"
          name="categories"
        />
        <FilterSelect
          options={subcategorySelectOptions}
          placeholder="Select subcategory"
          name="categories"
        />
      </div>
      <div className="products-table">
        {
          products.map(category => (
            <Category key={category.catId} category={category} />
          ))
        }
      </div>
    </div>
  );
};

export default ProductsTable;
