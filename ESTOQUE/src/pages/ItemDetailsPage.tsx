import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { getProductById, updateProduct } from '../services/productService';
import { ProductPurchase } from '../../ProductPurchase';

const ItemDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    (async () => {
      if (id) {
        const productId = parseInt(id, 10);
        const fetchedProduct = await getProductById(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setPrice(fetchedProduct.price);
        }
      }
    })();
  }, [id]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value));
  };

  const handleUpdatePrice = () => {
    if (product) {
      updateProduct(product.id, { price });
      alert('Price updated successfully!');
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="item-details-container">
      <div className="item-details-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="item-details-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>In Stock: {product.stock}</p>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input id="price" placeholder="Enter new price" aria-label="Product price" type="number" value={price} onChange={handlePriceChange} />
          <button onClick={handleUpdatePrice} className="login-button update-price-btn">Update Price</button>
        </div>
        <ProductPurchase product={product} />
      </div>
    </div>
  );
};

export default ItemDetailsPage;