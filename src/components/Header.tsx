'use client';

import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

function HeaderComponent({ cartItemCount, onOpenCart }: HeaderProps) {
  return (
    <header className="bg-amber-50 border-b border-amber-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">🥖</div>
            <div>
              <h1 className="text-xl font-bold text-amber-800">Panadería Delicias</h1>
              <p className="text-xs text-amber-600">Horneado con amor</p>
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full transition-colors"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
