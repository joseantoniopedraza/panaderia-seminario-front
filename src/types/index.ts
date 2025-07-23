export interface OrderModel {
  id: number;
  client: string;
  total: number;
  date: string;
}

export interface ProductModel {
  id: number;
  name: string;
  price: number;
  descripcion: string;
}

// Tipos adicionales que probablemente necesitaremos
export interface CartItem {
  product: ProductModel;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface OrderCreate {
  client: string;
  items: CartItem[];
}
