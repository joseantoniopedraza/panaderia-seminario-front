// Configuración de la API
const API_BASE_URL = 'https://panaderia-ia-79353642738.us-central1.run.app';

// Tipos para las respuestas de la API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Servicio para productos
export class ProductService {
  private static baseUrl = `${API_BASE_URL}/products`;

  static async getAll() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async getById(id: number) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
}

// Servicio para órdenes
export class OrderService {
  private static baseUrl = `${API_BASE_URL}/orders`;

  static async getAll() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const orders = await response.json();
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  static async create(orderData: {
    client: string;
    items: Array<{
      product_id: number;
      quantity: number;
    }>;
  }) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const order = await response.json();
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  static async getById(id: number) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const order = await response.json();
      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }
}

// Utilidad para manejar errores de la API
export const handleApiError = (error: any): string => {
  if (error instanceof TypeError) {
    return 'Error de conexión. Verifica tu conexión a internet.';
  }
  
  if (error.message.includes('HTTP error')) {
    const status = error.message.match(/status: (\d+)/)?.[1];
    switch (status) {
      case '404':
        return 'Recurso no encontrado.';
      case '500':
        return 'Error interno del servidor.';
      case '503':
        return 'Servicio no disponible temporalmente.';
      default:
        return `Error del servidor (${status}).`;
    }
  }
  
  return error.message || 'Error desconocido.';
};
