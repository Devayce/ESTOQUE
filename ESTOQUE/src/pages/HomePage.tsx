import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { products, isLoading, error } = useProducts();

  const renderContent = () => {
    if (isLoading) {
      return <p>Carregando produtos...</p>;
    }

    if (error) {
      return <p className="error-message">{error}</p>;
    }

    if (products.length === 0) {
      return <p>Nenhum produto encontrado.</p>;
    }

    return (
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Produtos</h1>
      {renderContent()}
    </div>
  );
};

export default HomePage;