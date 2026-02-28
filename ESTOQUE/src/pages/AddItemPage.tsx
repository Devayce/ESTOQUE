import { useAddItemForm } from '../hooks/useAddItemForm';
import './AddItemPage.css';

const AddItemPage = () => {
  const {
    formData,
    formErrors,
    isLoading,
    error,
    handleInputChange,
    handleImageChange,
    handleSubmit,
  } = useAddItemForm();

  return (
    <div className="add-item-container">
      <h1>Adicionar Novo Produto</h1>
      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-group">
          <label htmlFor="name">Nome do Produto</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ex: Camiseta Verde"
          />
          {formErrors.name && <p className="error-message">{formErrors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Ex: Camiseta de algodão, macia e confortável."
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço (R$)</label>
          <input
            id="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Ex: 49.90"
            step="0.01"
          />
          {formErrors.price && <p className="error-message">{formErrors.price}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="stock">Estoque Inicial</label>
          <input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Ex: 100"
            step="1"
          />
          {formErrors.stock && <p className="error-message">{formErrors.stock}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="image-upload">Imagem do Produto</label>
          <input
            id="image-upload" 
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        
        {formData.image && (
          <div className="form-group image-preview">
            <label>Pré-visualização:</label>
            <img src={formData.image} alt="Pré-visualização do produto" />
          </div>
        )}

        {error && <p className="error-message api-error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Adicionando...' : 'Adicionar Produto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemPage;