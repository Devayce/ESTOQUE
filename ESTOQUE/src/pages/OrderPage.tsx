import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useProfit } from '../contexts/ProfitContext';
import { saveOrder } from '../services/orderService';
import CartItemCard from '../components/CartItemCard/CartItemCard';
import './OrderPage.css';

interface FormError {
  customerName?: string;
  cart?: string;
}

interface ApiStatus {
  message: string;
  type: 'success' | 'error';
}

const OrderPage = () => {
  const { cartItems, clearCart } = useCart();
  const { fetchProfit } = useProfit();
  const [discount, setDiscount] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<FormError | null>(null);
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const numDiscount = parseFloat(discount) || 0;
  const total = subtotal * (1 - numDiscount / 100);

  const validateForm = () => {
    const errors: FormError = {};
    if (cartItems.length === 0) {
      errors.cart = 'Seu carrinho está vazio!';
    }
    if (!customerName.trim()) {
      errors.customerName = 'Por favor, insira o nome do cliente.';
    }
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFinalizeOrder = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setApiStatus(null);
    try {
      await saveOrder({
        items: cartItems,
        discount: numDiscount,
        total: total,
        customerName: customerName,
      });

      clearCart();
      await fetchProfit();
      
      setApiStatus({ message: 'Pedido finalizado com sucesso! Redirecionando...', type: 'success' });
      
      setTimeout(() => {
        navigate('/history');
      }, 2000);

    } catch (error: any) {
      console.error(error);
      setApiStatus({ message: `Erro ao finalizar pedido: ${error.message}`, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="order-page-container">
      <h2>Seu Pedido</h2>
      {cartItems.length === 0 && !formError?.cart ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map(item => (
              <CartItemCard key={item.product.id} item={item} />
            ))}
          </div>
          {formError?.cart && <p className="error-message">{formError.cart}</p>}

          <div className="order-summary">
            <h3>Resumo do Pedido</h3>
            <div className="form-group">
              <label>Nome do Cliente:</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Insira o nome do cliente"
              />
              {formError?.customerName && <p className="error-message">{formError.customerName}</p>}
            </div>
            <p>Subtotal: <strong>R$ {subtotal.toFixed(2)}</strong></p>
            <div className="form-group">
              <label>Desconto Total (%):</label>
              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="0"
              />
            </div>
            <hr />
            <p className="order-total">Total a Pagar: <strong>R$ {total.toFixed(2)}</strong></p>

            {apiStatus && (
              <p className={apiStatus.type === 'success' ? 'success-message' : 'error-message'}>
                {apiStatus.message}
              </p>
            )}

            <button 
              onClick={handleFinalizeOrder} 
              className="finalize-order-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Finalizando...' : 'Finalizar Pedido'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPage;
