import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { testData } from "../data/testData";
import { CategoryType } from "../types";

interface ProductsContextType {
  products: CategoryType[];
  setProducts: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  filterSearchTerm: string;
  setFilterSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
  const [products, setProducts] = useState<CategoryType[]>(testData);
  const [filterSearchTerm, setFilterSearchTerm] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return products.map(category => ({
      ...category,
      subcategories: category.subcategories.map(subcategory => ({
        ...subcategory,
        products: subcategory.products.filter(product => product.name.includes(filterSearchTerm))
      })).filter(subcategory => subcategory.products.length > 0)
    })).filter(category => category.subcategories.length > 0);
  }, [filterSearchTerm, products]);

  return (
    <ProductsContext.Provider value={{ products: filteredProducts, setProducts, filterSearchTerm, setFilterSearchTerm }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
