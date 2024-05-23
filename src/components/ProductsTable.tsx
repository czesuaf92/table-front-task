import { useState } from "react";
import { testData } from "../data/testData";
import Category from "./Category";

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState(testData);

  return (
    <div>
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
