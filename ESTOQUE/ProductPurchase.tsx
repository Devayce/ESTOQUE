import { useState } from 'react';
import { Product } from './src/types/Product';
import { useCart } from './src/contexts/CartContext';

interface ProductPurchaseProps {
  product: Product;
}

export function ProductPurchase({ product }: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState('');
  const { addToCart } = useCart();

  const numQuantity = parseFloat(quantity) || 0;

  // Cálculo do subtotal
  const subtotal = product.price * numQuantity;

  const handleAddToCart = () => {
    if (numQuantity > 0) {
      addToCart(product, numQuantity);
      alert(`${numQuantity} ${product.name}(s) adicionado(s) ao pedido!`);
      setQuantity(''); // Reset quantity after adding
    } else {
      alert('Por favor, insira uma quantidade válida.');
    }
  };

  return (
    <div style={{ paddingTop: '20px', marginTop: '20px', borderTop: '1px solid var(--card-border)' }}>
      <h3>Adicionar ao Pedido</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p>Preço Unitário: <strong>R$ {product.price.toFixed(2)}</strong></p>
      </div>

      <div className="form-group">
        <label>Quantidade:</label>
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="0"
        />
      </div>

      {/* Mostra o subtotal antes do desconto */}
      <div style={{ marginBottom: '10px' }}>
        <p>Subtotal: <strong>R$ {subtotal.toFixed(2)}</strong></p>
      </div>

      <button onClick={handleAddToCart} className="login-button" style={{ width: '100%', marginTop: '10px' }}>
        Adicionar ao Pedido
      </button>
    </div>
  );
}