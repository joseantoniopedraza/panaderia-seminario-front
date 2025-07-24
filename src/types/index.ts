export interface OrderModel {
  id: number;
  client: string;
  total: number;
  date: string; // ISO string format "2025-07-24T00:00:00.000Z"
  products: Array<{
    quantity: number;
    product: {
      id: number;
      name: string;
      price: number;
      description: string;
    };
  }>;
}

export interface ProductModel {
  id: number;
  name: string;
  price: number;
  description: string; // Cambiado de 'descripcion' para coincidir con la API
  photo?: string; // Opcional ya que la API no lo incluye aún
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
