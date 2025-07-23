'use client';

import { OrderModel } from '@/types';
import { Calendar, User, DollarSign } from 'lucide-react';

interface OrderListProps {
  orders: OrderModel[];
}

export default function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay pedidos</h3>
        <p className="text-gray-500">Los pedidos aparecerán aquí una vez que se realicen</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <User size={20} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{order.client}</h3>
                <p className="text-sm text-gray-500">Pedido #{order.id}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                <DollarSign size={18} />
                {order.total.toFixed(2)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={16} />
            <span>{new Date(order.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
