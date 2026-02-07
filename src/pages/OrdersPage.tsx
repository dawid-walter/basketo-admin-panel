import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { OrdersTable } from '../components/orders/OrdersTable';
import { Card } from '../components/common/Card';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Button } from '../components/common/Button';
import { useOrders } from '../hooks/useOrders';
import type { OrderStatus } from '../types';

export const OrdersPage = () => {
  const { orders, loading, error, refetch } = useOrders();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');

  const filteredOrders = statusFilter === 'ALL'
    ? orders
    : orders.filter(order => order.status === statusFilter);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage all customer orders
            </p>
          </div>
          <Button onClick={refetch}>
            Refresh
          </Button>
        </div>

        <Card>
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-4 py-2 rounded ${
                statusFilter === 'ALL'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('CREATED')}
              className={`px-4 py-2 rounded ${
                statusFilter === 'CREATED'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Created
            </button>
            <button
              onClick={() => setStatusFilter('PAID')}
              className={`px-4 py-2 rounded ${
                statusFilter === 'PAID'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Paid
            </button>
            <button
              onClick={() => setStatusFilter('SHIPPED')}
              className={`px-4 py-2 rounded ${
                statusFilter === 'SHIPPED'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Shipped
            </button>
            <button
              onClick={() => setStatusFilter('CANCELLED')}
              className={`px-4 py-2 rounded ${
                statusFilter === 'CANCELLED'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Cancelled
            </button>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Showing {filteredOrders.length} of {orders.length} orders
              </p>
              <OrdersTable orders={filteredOrders} />
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};
