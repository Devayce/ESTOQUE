import React from 'react';
import { useCart, CartItem } from '../../contexts/CartContext';
import './CartItemCard.css';

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { removeFromCart, updateItemQuantity } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      updateItemQuantity(item.product.id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.product.image} alt={item.product.name} />
      </div>
      <div className="cart-item-details">
        <h3>{item.product.name}</h3>
        <p>Preço Unitário: R$ {item.product.price.toFixed(2)}</p>
        <div className="cart-item-quantity">
          <label htmlFor={`quantity-${item.product.id}`}>Quantidade:</label>
          <input
            id={`quantity-${item.product.id}`}
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            min="1"
            step="1"
          />
        </div>
        <p>Subtotal: R$ {(item.product.price * item.quantity).toFixed(2)}</p>
        <button onClick={() => removeFromCart(item.product.id)} className="remove-item-btn">
          Remover
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
