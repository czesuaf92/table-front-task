import { useProducts } from "../contexts/ProductsContext";
import Category from "./Category";
import SearchBar from "./SearchBar";

const ProductsTable: React.FC = () => {
  const { products } = useProducts();

  return (
    <div>
      <SearchBar />
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
