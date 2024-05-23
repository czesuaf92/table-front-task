import { CategoryType } from "../types";
import Subcategory from "./Subcategory";

interface CategoryProps {
  category: CategoryType;
}

const Category = ({ category }: CategoryProps) => {
  return (
    <div key={category.catId} className="category">
      <div className="category-header">{category.name}</div>
      {
        category.subcategories.map(subcategory => (
          <Subcategory key={subcategory.subCatId} subcategory={subcategory} />
        ))
      }
    </div>
  );
};
export default Category;
