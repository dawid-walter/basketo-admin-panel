import { Layout } from '../components/layout/Layout';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { OrdersTable } from '../components/orders/OrdersTable';
import { Card } from '../components/common/Card';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useOrders } from '../hooks/useOrders';

export const DashboardPage = () => {
  const { orders, loading, error } = useOrders();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Overview of your store performance
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <Card>
            <div className="text-red-600">{error}</div>
          </Card>
        ) : (
          <>
            <DashboardStats orders={orders} />

            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Orders
              </h2>
              <OrdersTable orders={orders.slice(0, 10)} />
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};
