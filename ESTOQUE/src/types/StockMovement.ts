export interface StockMovement {
  id: number;
  productId: number;
  type: 'entry' | 'exit';
  quantity: number;
  date: Date;
  unitPrice: number;
}
