'use client';

import { useState, useEffect } from 'react';
import { ProductModel, OrderModel, CartItem } from '@/types';
import { useCart } from '@/hooks/useCart';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import OrderList from '@/components/OrderList';
import Footer from '@/components/Footer';

// Datos mock mientras conectamos con el backend
const mockProducts: ProductModel[] = [
  {
    id: 1,
    name: "Pan Francés",
    price: 2.50,
    descripcion: "Pan crujiente por fuera, suave por dentro. Perfecto para el desayuno o para acompañar cualquier comida.",
    photo: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Croissant de Mantequilla",
    price: 3.75,
    descripcion: "Croissant hojaldrado con mantequilla francesa. Dorado y delicioso, ideal para el desayuno.",
    photo: "https://images.unsplash.com/photo-1555507036-ab794f27d1ea?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Empanadas de Pollo",
    price: 4.25,
    descripcion: "Empanadas caseras rellenas de pollo desmenuzado con especias y verduras. Horneadas hasta quedar doradas.",
    photo: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Torta Tres Leches",
    price: 18.99,
    descripcion: "Deliciosa torta esponjosa bañada en tres tipos de leche. Un postre tradicional irresistible.",
    photo: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Pan Integral",
    price: 3.00,
    descripcion: "Pan integral con semillas, rico en fibra y nutrientes. Perfecto para una alimentación saludable.",
    photo: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "Galletas de Chocolate",
    price: 8.50,
    descripcion: "Galletas caseras con chips de chocolate belga. Crujientes por fuera, suaves por dentro.",
    photo: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop"
  }
];

export default function Home() {
  const {
    items,
    isCartOpen,
    total,
    totalItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    openCart,
    closeCart,
  } = useCart();

  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [activeTab, setActiveTab] = useState<'productos' | 'pedidos'>('productos');

  const handleCheckout = async (clientName: string) => {
    // Simular llamada al backend
    const newOrder: OrderModel = {
      id: orders.length + 1,
      client: clientName,
      total: total,
      date: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    closeCart();
    
    // Mostrar mensaje de éxito (podrías usar una librería de notificaciones)
    alert(`¡Pedido realizado exitosamente! Número de pedido: ${newOrder.id}`);
  };

  return (
    <div className="min-h-screen bg-amber-25">
      <Header 
        cartItemCount={totalItems} 
        onOpenCart={openCart} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4">
            🥖 Panadería Delicias
          </h1>
          <p className="text-xl text-amber-700 mb-8">
            Los mejores panes y pasteles, horneados frescos cada día
          </p>
        </section>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('productos')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'productos'
                  ? 'bg-amber-500 text-white'
                  : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              Productos
            </button>
            <button
              onClick={() => setActiveTab('pedidos')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'pedidos'
                  ? 'bg-amber-500 text-white'
                  : 'text-amber-700 hover:text-amber-900'
              }`}
            >
              Pedidos ({orders.length})
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'productos' && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestros Productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'pedidos' && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Historial de Pedidos</h2>
            <OrderList orders={orders} />
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart */}
      <Cart
        items={items}
        isOpen={isCartOpen}
        onClose={closeCart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
