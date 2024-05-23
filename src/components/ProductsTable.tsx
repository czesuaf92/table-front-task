import { useProducts } from "../contexts/ProductsContext";
import Category from "./Category";
import FilterSelect from "./FilterSelect";
import SearchBar from "./SearchBar";

const ProductsTable: React.FC = () => {
  const { products, setFilterCategory, categorySelectOptions, subcategorySelectOptions, setFilterSubcategory } = useProducts();

  return (
    <div>
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
