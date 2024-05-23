import uniqBy from "lodash/uniqBy";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { testData } from "../data/testData";
import { CategoryType, SelectOptionType } from "../types";

interface ProductsContextType {
  products: CategoryType[];
  filterSearchTerm: string;
  categorySelectOptions: SelectOptionType[];
  subcategorySelectOptions: SelectOptionType[];
  setFilterSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setFilterCategory: React.Dispatch<React.SetStateAction<SelectOptionType[]>>;
  setFilterSubcategory: React.Dispatch<React.SetStateAction<SelectOptionType[]>>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
  const [products] = useState<CategoryType[]>(testData);
  const [filterSearchTerm, setFilterSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<SelectOptionType[]>([]);
  const [filterSubcategory, setFilterSubcategory] = useState<SelectOptionType[]>([]);

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

  const filteredProducts = useMemo(() => {
    let filteredProducts = products;

    if (filterCategory.length) {
      filteredProducts = filteredProducts.filter(category => {
        return filterCategory.some(selectedCategory => selectedCategory.value === category.catId.toString());
      });
    }

    if (filterSubcategory.length) {
      filteredProducts = filteredProducts.map(category => ({
        ...category,
        subcategories: category.subcategories.filter(subcategory => filterSubcategory.some(selectedSubcategory => selectedSubcategory.label === subcategory.name))
      })).filter(category => category.subcategories.length > 0);
    }

    if (filterSearchTerm.length) {
      filteredProducts = filteredProducts.map(category => ({
        ...category,
        subcategories: category.subcategories.map(subcategory => ({
          ...subcategory,
          products: subcategory.products.filter(product => product.name.includes(filterSearchTerm))
        })).filter(subcategory => subcategory.products.length > 0)
      })).filter(category => category.subcategories.length > 0);
    }

    return filteredProducts;
  }, [filterSearchTerm, products, filterCategory, filterSubcategory]);

  return (
    <ProductsContext.Provider
      value={{
        products: filteredProducts,
        filterSearchTerm,
        categorySelectOptions,
        subcategorySelectOptions,
        setFilterSearchTerm,
        setFilterCategory,
        setFilterSubcategory,
      }}
    >
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
