import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/item/${product.id}`} className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>R$ {product.price.toFixed(2)}</p>
    </Link>
  );
};

export default ProductCard;
