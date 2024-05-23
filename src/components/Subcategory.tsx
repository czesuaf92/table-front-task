import { SubCategoryType } from "../types";
import ProductRow from "./ProductRow";

interface SubcategoryProps {
  subcategory: SubCategoryType;
}

const Subcategory = ({ subcategory }: SubcategoryProps) => {
  return (
    <div className="subcategory">
      <div className="subcategory-header">{subcategory.name}</div>
      {subcategory.products.map(product => (
        <ProductRow key={product.index} product={product} />
      ))}
    </div>
  );
};
export default Subcategory;
