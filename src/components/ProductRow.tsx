import { ProductType } from "../types";

interface ProductRowProps {
  product: ProductType;
}

const ProductRow = ({ product }: ProductRowProps) => {
  return (
    <div className="product-row">
      <div className="product-cell">{product.index}</div>
      <div className="product-cell">{product.name}</div>
      <div className="product-cell">{product.price}</div>
      <div className="product-cell">{product.quantity}</div>
    </div>
  );
};
export default ProductRow;
