'use client';

import { useState, useEffect } from 'react';
import { ProductModel, OrderModel, CartItem } from '@/types';
import { ProductService, OrderService, handleApiError } from '@/services/api';
import { useCart } from '@/hooks/useCart';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import OrderList from '@/components/OrderList';
import Footer from '@/components/Footer';

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

  const [products, setProducts] = useState<ProductModel[]>([]);
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [activeTab, setActiveTab] = useState<'productos' | 'pedidos'>('productos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar productos desde la API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await ProductService.getAll();
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError(handleApiError(err));
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Cargar órdenes desde la API
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await OrderService.getAll();
        setOrders(ordersData);
      } catch (err) {
        console.error('Error loading orders:', err);
      }
    };

    loadOrders();
  }, []);

  const handleCheckout = async (clientName: string) => {
    try {
      // Transformar items del carrito al formato esperado por la API
      const orderItems = items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity
      }));

      // Crear orden en la API
      const newOrder = await OrderService.create({
        client: clientName,
        items: orderItems
      });

      // Actualizar lista de órdenes
      setOrders(prev => [newOrder, ...prev]);
      clearCart();
      closeCart();
      
      // Mostrar mensaje de éxito
      alert(`¡Pedido realizado exitosamente! Número de pedido: ${newOrder.id}`);
    } catch (err) {
      const errorMessage = handleApiError(err);
      alert(`Error al crear el pedido: ${errorMessage}`);
      console.error('Error creating order:', err);
    }
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
            
            {/* Loading state */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                <span className="ml-3 text-amber-700">Cargando productos...</span>
              </div>
            )}
            
            {/* Error state */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <div className="text-red-400">⚠️</div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error al cargar productos</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="text-sm text-red-600 underline mt-2"
                    >
                      Intentar de nuevo
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Products grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
            
            {/* Empty state */}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🥖</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos disponibles</h3>
                <p className="text-gray-500">Los productos se están preparando en el horno...</p>
              </div>
            )}
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
