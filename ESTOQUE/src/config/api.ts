// Centraliza a construção da URL da API para evitar duplicação/erros de porta.
// Use a variável VITE_API_BASE para apontar à origem do backend (ex: 'http://localhost:5000').
// Se não informada, usamos '/api' e o proxy do Vite redirecionará para o backend em desenvolvimento.
const env = (import.meta as any).env;
const base = (env?.VITE_API_BASE as string) ?? '';
export const API_URL = base ? `${base.replace(/\/$/, '')}/api` : '/api';

export default API_URL;
