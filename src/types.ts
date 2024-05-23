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
