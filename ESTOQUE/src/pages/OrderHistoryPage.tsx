import { useState, useEffect } from 'react';
import { getOrders, Order } from '../services/orderService';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const fetched = await getOrders();
      setOrders(fetched);
    })();
  }, []);

  const toggleOrder = (orderId: number) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null); // Collapse if already expanded
    } else {
      setExpandedOrderId(orderId); // Expand new one
    }
  };

  return (
    <div className="order-history-container">
      <h2>Histórico de Pedidos</h2>
      {orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card-header" onClick={() => toggleOrder(order.id)}>
                <div className="order-header-main">
                  <h3>{order.customerName}</h3>
                  <span>Data: {new Date(order.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <strong>Total: R$ {order.total.toFixed(2)}</strong>
              </div>
              <div className={`order-card-body ${expandedOrderId === order.id ? 'expanded' : ''}`}>
                <h4>Itens do Pedido:</h4>
                {order.items.map((item: any) => (
                  <div key={item.product.id} className="order-item">
                    <span>{item.product.name} (x{item.quantity})</span>
                    <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                {order.discount > 0 && (
                  <p className="order-body-discount">Desconto aplicado: {order.discount}%</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
