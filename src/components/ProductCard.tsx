'use client';

import { ProductModel } from '@/types';
import { ShoppingCart, Plus } from 'lucide-react';

interface ProductCardProps {
  product: ProductModel;
  onAddToCart?: (product: ProductModel) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Placeholder para imagen del producto */}
      <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
        <span className="text-4xl">🥖</span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {product.descripcion}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-amber-600">
            ${product.price.toFixed(2)}
          </span>
          
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <Plus size={16} />
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
