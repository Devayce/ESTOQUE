import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../services/productService';

// Tipagem para os dados do formulário
export interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  image: string;
}

// Tipagem para os erros de validação
export interface FormErrors {
  name?: string;
  price?: string;
  stock?: string;
}

export const useAddItemForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (loadEvent) => {
        if (typeof loadEvent.target?.result === 'string') {
          setFormData((prev) => ({ ...prev, image: loadEvent.target.result as string }));
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name) errors.name = 'O nome do produto é obrigatório.';
    if (!formData.price) errors.price = 'O preço é obrigatório.';
    if (parseFloat(formData.price) <= 0) errors.price = 'O preço deve ser maior que zero.';
    if (!formData.stock) errors.stock = 'O estoque inicial é obrigatório.';
    if (parseInt(formData.stock, 10) < 0) errors.stock = 'O estoque não pode ser negativo.';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      await addProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        image: formData.image,
      });
      navigate('/home'); 
    } catch (err) {
      setError('Falha ao adicionar o produto. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    formErrors,
    isLoading,
    error,
    handleInputChange,
    handleImageChange,
    handleSubmit,
  };
};
