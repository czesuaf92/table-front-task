export interface ProductType {
  index: string;
  name: string;
  quantity: number;
  price: number;
}
export interface SubCategoryType {
  subCatId: string;
  name: string;
  products: ProductType[];

}
export interface CategoryType {
  catId: number;
  name: string;
  subcategories: SubCategoryType[];
}

export type SortOptionType = '-' | 'asc' | 'desc';

export interface SelectOptionType {
  label: string;
  value: string;
}

export interface AutoSizerSizeType {
  height: number;
  width: number;
}
